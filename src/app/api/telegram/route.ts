import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { cultivars } from '@/data/products';
import { getProductPrice, getProductPriceByHeight } from '@/utils/productUtils';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, customerInfo } = body;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      return NextResponse.json(
        { error: 'Telegram configuration missing' },
        { status: 500 }
      );
    }

    // Формуємо повідомлення для Telegram
    let message = `🛒 *Нове замовлення з сайту Хурмовий сад*\n\n`;
    
    // Інформація про клієнта
    message += `👤 *Клієнт:*\n`;
    message += `Ім'я: ${customerInfo.name}\n`;
    message += `Прізвище: ${customerInfo.surname}\n`;
    message += `Телефон: ${customerInfo.phone}\n`;
    if (customerInfo.email) {
      message += `Email: ${customerInfo.email}\n`;
    }
    
    // Інформація про доставку
    message += `\n🚚 *Доставка (Нова Пошта):*\n`;
    
    // Нові структуровані поля
    if (customerInfo.npCityName) {
      message += `📍 Місто: ${customerInfo.npCityName}\n`;
    }
    if (customerInfo.npWarehouseNumber && customerInfo.npWarehouseAddress) {
      message += `🏢 Відділення №${customerInfo.npWarehouseNumber}: ${customerInfo.npWarehouseAddress}\n`;
    }
    
    // Старі поля (якщо є)
    if (customerInfo.novaPoshtaAddress) {
      message += `📝 Додаткова адреса: ${customerInfo.novaPoshtaAddress}\n`;
    }
    if (customerInfo.novaPoshtaBranchNumber && !customerInfo.npWarehouseNumber) {
      message += `🏢 Відділення: ${customerInfo.novaPoshtaBranchNumber}\n`;
    }
    
    if (customerInfo.comments) {
      message += `\n💬 *Коментарі:* ${customerInfo.comments}\n`;
    }
    
    message += `\n📦 *Замовлення:*\n`;
    
    let totalItems = 0;
    let totalAmount = 0;
    items.forEach((item: { id: number; title: string; qty: number; price?: number; height?: string; priceLabel?: string }, index: number) => {
      // Знаходимо продукт в базі даних для отримання актуальної ціни та деталей
      const product = cultivars.find(p => p.id === item.id);
      
      // Використовуємо правильну ціну на основі висоти саджанця
      let itemPrice: number;
      let priceText: string;
      
      if (product && item.height) {
        // Якщо є висота саджанця, використовуємо getProductPriceByHeight
        itemPrice = getProductPriceByHeight(product, item.height);
        priceText = item.priceLabel || `${itemPrice} грн/шт (${item.height})`;
      } else if (product) {
        // Якщо немає висоти, використовуємо стандартну ціну
        itemPrice = getProductPrice(product);
        priceText = item.priceLabel || product?.price || `${itemPrice} грн/шт`;
      } else {
        // Fallback на ціну з корзини або стандартну
        itemPrice = item.price || 800;
        priceText = item.priceLabel || `${itemPrice} грн/шт`;
      }
      
      const itemSum = item.qty * itemPrice;
      
      message += `${index + 1}. ${item.title}`;
      if (product) {
        message += ` (${product.species})`;
        if (product.rootSystem) {
          message += ` [${product.rootSystem === 'open' ? 'ВКС' : 'ЗКС'}]`;
        }
      }
      
      // Додаємо інформацію про висоту саджанця, якщо є
      if (item.height && item.height !== 'standard') {
        message += `\n   📏 Висота: ${item.height}`;
      }
      
      message += ` — ${item.qty} шт. × ${priceText} = ${itemSum.toLocaleString('uk-UA')} грн\n`;
      totalItems += item.qty;
      totalAmount += itemSum;
    });
    
    message += `\n📊 *Підсумок:*\n`;
    message += `Всього позицій: ${items.length}\n`;
    message += `Загальна кількість: ${totalItems} шт.\n`;
    message += `До сплати: ${totalAmount.toLocaleString('uk-UA')} грн\n`;
    // Додаємо +3 години до серверного часу для України (UTC+3)
    const serverTime = new Date();
    const ukraineTime = new Date(serverTime.getTime() + 3 * 60 * 60 * 1000);
    message += `\n⏰ Час замовлення: ${ukraineTime.toLocaleString('uk-UA')}`;

    // Відправляємо повідомлення в Telegram
    const telegramResponse = await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      }
    );

    if (telegramResponse.data.ok) {
      return NextResponse.json({ success: true });
    } else {
      throw new Error('Failed to send message to Telegram');
    }
  } catch (error) {
    console.error('Error sending to Telegram:', error);
    return NextResponse.json(
      { error: 'Failed to send order to Telegram' },
      { status: 500 }
    );
  }
}

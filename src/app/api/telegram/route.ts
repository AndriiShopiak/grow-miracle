import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { cultivars } from '@/data/products';
import { getProductPrice } from '@/utils/productUtils';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, customerInfo, clientTime } = body;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      return NextResponse.json(
        { error: 'Telegram configuration missing' },
        { status: 500 }
      );
    }

    // Формуємо повідомлення для Telegram
    let message = `🛒 *Нове замовлення з сайту Сад Олега*\n\n`;
    
    // Інформація про клієнта
    message += `👤 *Клієнт:*\n`;
    message += `Ім'я: ${customerInfo.name}\n`;
    message += `Телефон: ${customerInfo.phone}\n`;
    if (customerInfo.email) {
      message += `Email: ${customerInfo.email}\n`;
    }
    if (customerInfo.address) {
      message += `Адреса: ${customerInfo.address}\n`;
    }
    if (customerInfo.comments) {
      message += `Коментарі: ${customerInfo.comments}\n`;
    }
    
    message += `\n📦 *Замовлення:*\n`;
    
    let totalItems = 0;
    let totalAmount = 0;
    items.forEach((item: { id: number; title: string; qty: number; price?: number }, index: number) => {
      // Знаходимо продукт в базі даних для отримання актуальної ціни та деталей
      const product = cultivars.find(p => p.id === item.id);
      const itemPrice = product ? getProductPrice(product) : item.price || 800;
      const priceText = product?.price || `${itemPrice} грн/шт`;
      const itemSum = item.qty * itemPrice;
      
      message += `${index + 1}. ${item.title}`;
      if (product) {
        message += ` (${product.species})`;
        if (product.rootSystem) {
          message += ` [${product.rootSystem === 'open' ? 'ВКС' : 'ЗКС'}]`;
        }
      }
      message += ` — ${item.qty} шт. × ${priceText} = ${itemSum.toLocaleString('uk-UA')} грн\n`;
      totalItems += item.qty;
      totalAmount += itemSum;
    });
    
    message += `\n📊 *Підсумок:*\n`;
    message += `Всього позицій: ${items.length}\n`;
    message += `Загальна кількість: ${totalItems} шт.\n`;
    message += `До сплати: ${totalAmount.toLocaleString('uk-UA')} грн\n`;
    // Використовуємо час клієнта, якщо він переданий, інакше серверний час
    const orderTime = clientTime ? new Date(clientTime).toLocaleString('uk-UA') : new Date().toLocaleString('uk-UA');
    message += `\n⏰ Час замовлення: ${orderTime}`;

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

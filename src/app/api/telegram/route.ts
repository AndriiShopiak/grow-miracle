import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { UNIFIED_PRICE, UNIFIED_PRICE_VALUE } from '@/data/products';

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
    items.forEach((item: any, index: number) => {
      const itemSum = item.qty * UNIFIED_PRICE_VALUE;
      message += `${index + 1}. ${item.title} — ${item.qty} шт. × ${UNIFIED_PRICE} = ${itemSum.toLocaleString('uk-UA')} грн\n`;
      totalItems += item.qty;
      totalAmount += itemSum;
    });
    
    message += `\n📊 *Підсумок:*\n`;
    message += `Всього позицій: ${items.length}\n`;
    message += `Загальна кількість: ${totalItems} шт.\n`;
    message += `До сплати: ${totalAmount.toLocaleString('uk-UA')} грн\n`;
    message += `\n⏰ Час замовлення: ${new Date().toLocaleString('uk-UA')}`;

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

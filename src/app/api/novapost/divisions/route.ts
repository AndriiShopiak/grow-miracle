import { NextRequest, NextResponse } from 'next/server';

// Типи для API Нової Пошти
interface NovaPoshtaSearchSettlementsRequest {
  apiKey: string;
  modelName: 'AddressGeneral';
  calledMethod: 'searchSettlements';
  methodProperties: {
    CityName: string;
    Limit?: string;
    Page?: string;
  };
}

interface NovaPoshtaSearchSettlementsResponseItem {
  TotalCount: number;
  Addresses: Array<{
    Present: string;
    Warehouses: string;
    MainDescription: string;
    Area: string;
    Region: string;
    SettlementTypeCode: string;
    Ref: string;
    DeliveryCity: string;
    StreetsAvailability: string;
  }>;
}

interface NovaPoshtaSearchSettlementsResponse {
  success: boolean;
  data: NovaPoshtaSearchSettlementsResponseItem[];
  errors: string[];
  warnings: string[];
  info: string[];
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Валідація вхідних даних
    if (!body.cityName || typeof body.cityName !== 'string') {
      return NextResponse.json(
        { error: 'City name is required and must be a string' },
        { status: 400 }
      );
    }

    // Отримуємо API ключ з змінних середовища (NOVA_POST_TOKEN)
    const apiKey = process.env.NOVA_POST_TOKEN;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Nova Poshta API key is not configured' },
        { status: 500 }
      );
    }

    // Формуємо запит до API Нової Пошти (searchSettlements)
    const novaPoshtaRequest: NovaPoshtaSearchSettlementsRequest = {
      apiKey,
      modelName: 'AddressGeneral',
      calledMethod: 'searchSettlements',
      methodProperties: {
        CityName: body.cityName,
        Page: body.page || '1',
        Limit: body.limit || '50'
      }
    };

    // Відправляємо запит до API Нової Пошти
    const response = await fetch('https://api.novaposhta.ua/v2.0/json/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(novaPoshtaRequest),
    });

    if (!response.ok) {
      throw new Error(`Nova Poshta API error: ${response.status}`);
    }

    const data: NovaPoshtaSearchSettlementsResponse = await response.json();
    if (body.debug) {
      console.log('[NP searchSettlements]', {
        q: body.cityName,
        page: body.page || '1',
        limit: body.limit || '50',
        success: data.success,
        total: data.data?.[0]?.TotalCount,
        errCount: data.errors?.length || 0,
        warnCount: data.warnings?.length || 0
      });
    }

    // Перевіряємо чи є помилки в відповіді
    if (!data.success || data.errors.length > 0) {
      return NextResponse.json(
        { 
          error: 'Nova Poshta API error', 
          details: data.errors,
          warnings: data.warnings 
        },
        { status: 400 }
      );
    }

    // Повертаємо знайдені населені пункти
    const item = data.data?.[0];
    const addresses = item?.Addresses ?? [];
    return NextResponse.json({
      success: true,
      data: addresses,
      total: item?.TotalCount ?? addresses.length,
      cityName: body.cityName,
      raw: body.debug ? data : undefined
    });

  } catch (error) {
    console.error('Error fetching Nova Poshta divisions:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Додаємо GET метод для отримання інформації про API
export async function GET() {
  return NextResponse.json({
    message: 'Nova Poshta Divisions API',
    description: 'POST endpoint for searching Nova Poshta divisions by city',
    usage: {
      method: 'POST',
      body: {
        cityName: 'string (required) - Name of the city',
        page: 'string (optional) - Page number, default: 1',
        limit: 'string (optional) - Number of results per page, default: 50'
      },
      example: {
        cityName: 'Київ',
        page: '1',
        limit: '20'
      }
    }
  });
}

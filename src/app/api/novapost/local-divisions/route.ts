import { NextRequest, NextResponse } from 'next/server';

// Типи для API Нової Пошти - getWarehouses
interface NovaPoshtaWarehousesRequest {
  apiKey: string;
  modelName: 'AddressGeneral';
  calledMethod: 'getWarehouses';
  methodProperties: {
    CityRef: string;
    Page?: string;
    Limit?: string;
  };
}

interface NovaPoshtaWarehouse {
  Ref: string;
  Description: string;
  DescriptionRu: string;
  ShortAddress: string;
  ShortAddressRu: string;
  Phone: string;
  TypeOfWarehouse: string;
  Number: string;
  CityRef: string;
  CityDescription: string;
  CityDescriptionRu: string;
  SettlementRef: string;
  SettlementDescription: string;
  SettlementAreaDescription: string;
  SettlementRegionsDescription: string;
  SettlementTypeDescription: string;
  Longitude: string;
  Latitude: string;
  PostFinance: string;
  BicycleParking: string;
  PaymentAccess: string;
  POSTerminal: string;
  InternationalShipping: string;
  SelfServiceWorkplacesCount: string;
  TotalMaxWeightAllowed: string;
  PlaceMaxWeightAllowed: string;
  SendingLimitationsOnDimensions: {
    Width: number;
    Height: number;
    Length: number;
  };
  ReceivingLimitationsOnDimensions: {
    Width: number;
    Height: number;
    Length: number;
  };
  Reception: {
    Monday: string;
    Tuesday: string;
    Wednesday: string;
    Thursday: string;
    Friday: string;
    Saturday: string;
    Sunday: string;
  };
  Delivery: {
    Monday: string;
    Tuesday: string;
    Wednesday: string;
    Thursday: string;
    Friday: string;
    Saturday: string;
    Sunday: string;
  };
  Schedule: {
    Monday: string;
    Tuesday: string;
    Wednesday: string;
    Thursday: string;
    Friday: string;
    Saturday: string;
    Sunday: string;
  };
  DistrictCode: string;
  WarehouseStatus: string;
  WarehouseStatusDate: string;
  CategoryOfWarehouse: string;
  Direct: string;
  RegionCity: string;
  WarehouseForAgent: string;
  GeneratorEnabled: string;
  MaxDeclaredCost: string;
  WorkInMobileAwis: string;
  DenyToSelect: string;
  CanGetMoneyTransfer: string;
  OnlyReceivingParcel: string;
  PostMachineType: string;
  PostalCodeUA: string;
  WarehouseIndex: string;
  BeaconCode: string;
}

interface NovaPoshtaWarehousesResponse {
  success: boolean;
  data: NovaPoshtaWarehouse[];
  errors: string[];
  warnings: string[];
  info: string[];
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Валідація вхідних даних
    if (!body.deliveryCity || typeof body.deliveryCity !== 'string') {
      return NextResponse.json(
        { error: 'DeliveryCity (city reference) is required and must be a string' },
        { status: 400 }
      );
    }

    // Отримуємо API ключ з змінних середовища
    const apiKey = process.env.NOVA_POST_TOKEN;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Nova Poshta API key is not configured' },
        { status: 500 }
      );
    }

    // Формуємо запит до API Нової Пошти (getWarehouses)
    const novaPoshtaRequest: NovaPoshtaWarehousesRequest = {
      apiKey,
      modelName: 'AddressGeneral',
      calledMethod: 'getWarehouses',
      methodProperties: {
        CityRef: body.deliveryCity,
        Page: body.page || '1',
        Limit: body.limit || '50'
      }
    };

    // Логування для debug
    if (body.debug) {
      console.log('[NP getWarehouses]', {
        cityRef: body.deliveryCity,
        page: body.page || '1',
        limit: body.limit || '50'
      });
    }

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

    const data: NovaPoshtaWarehousesResponse = await response.json();

    // Логування результату для debug
    if (body.debug) {
      console.log('[NP getWarehouses result]', {
        success: data.success,
        warehousesCount: data.data?.length || 0,
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

    // Повертаємо відділення
    return NextResponse.json({
      success: true,
      data: data.data,
      total: data.data.length,
      deliveryCity: body.deliveryCity,
      raw: body.debug ? data : undefined
    });

  } catch (error) {
    console.error('Error fetching Nova Poshta warehouses:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Додаємо GET метод для отримання інформації про API
export async function GET() {
  return NextResponse.json({
    message: 'Nova Poshta Local Divisions API',
    description: 'POST endpoint for getting Nova Poshta warehouses by city reference',
    usage: {
      method: 'POST',
      body: {
        deliveryCity: 'string (required) - City reference (DeliveryCity from searchSettlements)',
        page: 'string (optional) - Page number, default: 1',
        limit: 'string (optional) - Number of results per page, default: 50',
        debug: 'boolean (optional) - Enable debug mode'
      },
      example: {
        deliveryCity: '8d5a980d-391c-11dd-90d9-001a92567626',
        page: '1',
        limit: '20',
        debug: true
      }
    },
    note: 'Use deliveryCity from the searchSettlements API response'
  });
}

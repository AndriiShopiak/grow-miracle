"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart/CartContext";

interface CustomerInfo {
  name: string;
  surname: string;
  phone: string;
  email?: string;
  novaPoshtaAddress: string; // deprecated free text
  novaPoshtaBranchNumber: string; // deprecated free text
  // new structured fields
  npCityName?: string;
  npCityRef?: string; // DeliveryCity
  npWarehouseRef?: string;
  npWarehouseNumber?: string;
  npWarehouseAddress?: string;
  comments?: string;
}

type NpSettlementAddress = {
  Present: string;
  MainDescription: string;
  DeliveryCity: string; // CityRef used to fetch warehouses
};

type NpWarehouse = {
  Ref: string;
  Number: string;
  ShortAddress?: string;
  Description?: string;
};


interface OrderFormProps {
  onOrderSent?: () => void;
  setSubmitStatus: (status: "idle" | "success" | "error") => void;
}

export default function OrderForm({ onOrderSent, setSubmitStatus }: OrderFormProps) {
  const { items, clear } = useCart();
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "",
    surname: "",
    phone: "",
    email: "",
    novaPoshtaAddress: "",
    novaPoshtaBranchNumber: "",
    comments: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // NP state
  const [cityQuery, setCityQuery] = useState("");
  const [cityResults, setCityResults] = useState<NpSettlementAddress[]>([]);
  const [cityLoading, setCityLoading] = useState(false);
  const [warehouses, setWarehouses] = useState<NpWarehouse[]>([]);
  const [warehousesLoading, setWarehousesLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Debounce helper
  const useDebouncedValue = (value: string, delayMs: number) => {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
      const id = setTimeout(() => setDebounced(value), delayMs);
      return () => clearTimeout(id);
    }, [value, delayMs]);
    return debounced;
  };
  const debouncedCity = useDebouncedValue(cityQuery, 300);

  // Search settlements
  useEffect(() => {
    if (!debouncedCity || debouncedCity.trim().length < 2) {
      setCityResults([]);
      return;
    }
    let cancelled = false;
    (async () => {
      setCityLoading(true);
      setErrorMsg(null);
      try {
        const res = await fetch("/api/novapost/divisions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cityName: debouncedCity, limit: "10", page: "1" })
        });
        const json = await res.json();
        if (!cancelled) {
          if (res.ok && json.success) {
            type RawSettlement = { Present: unknown; MainDescription: unknown; DeliveryCity: unknown };
            const mapped: NpSettlementAddress[] = (json.data as RawSettlement[] | undefined || []).map((a) => ({
              Present: String(a.Present ?? ""),
              MainDescription: String(a.MainDescription ?? ""),
              DeliveryCity: String(a.DeliveryCity ?? ""),
            }));
            setCityResults(mapped);
          } else {
            setCityResults([]);
            setErrorMsg(json?.error || "Помилка пошуку міста");
          }
        }
      } catch {
        if (!cancelled) setErrorMsg("Помилка мережі при пошуку міста");
      } finally {
        if (!cancelled) setCityLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [debouncedCity]);

  // Load warehouses when city selected
  useEffect(() => {
    const cityRef = customerInfo.npCityRef;
    if (!cityRef) {
      setWarehouses([]);
      return;
    }
    let cancelled = false;
    (async () => {
      setWarehousesLoading(true);
      setErrorMsg(null);
      try {
        const res = await fetch("/api/novapost/local-divisions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ deliveryCity: cityRef, limit: "100", page: "1" })
        });
        const json = await res.json();
        if (!cancelled) {
          if (res.ok && json.success) {
            type RawWarehouse = { Ref?: unknown; Number?: unknown; ShortAddress?: unknown; Description?: unknown };
            const list: NpWarehouse[] = (json.data as RawWarehouse[] | undefined || []).map((w) => ({
              Ref: String(w.Ref ?? ""),
              Number: String(w.Number ?? ""),
              ShortAddress: w.ShortAddress !== undefined ? String(w.ShortAddress) : undefined,
              Description: w.Description !== undefined ? String(w.Description) : undefined,
            }));
            setWarehouses(list);
          } else {
            setWarehouses([]);
            setErrorMsg(json?.error || "Помилка завантаження відділень");
          }
        }
      } catch {
        if (!cancelled) setErrorMsg("Помилка мережі при завантаженні відділень");
      } finally {
        if (!cancelled) setWarehousesLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [customerInfo.npCityRef]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Валідація полів Нової Пошти
    if (!customerInfo.npCityRef || !customerInfo.npWarehouseRef) {
      setErrorMsg("Будь ласка, оберіть місто та відділення Нової Пошти зі списку");
      return;
    }
    
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items,
          customerInfo,
        }),
      });
      if (response.ok) {
        setSubmitStatus("success");
        clear();
        if (onOrderSent) {
          onOrderSent();
        }
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value,
    }));
  };


  if (items.length === 0) {
    return (
      <div className="bg-white rounded-xl p-8 text-center shadow">
        <p className="text-gray-700 mb-4">Ваш кошик порожній</p>
        <Link href="/" className="inline-block rounded-lg bg-primary px-5 py-2 text-white hover:bg-secondary transition-colors">
          До каталогу
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <h3 className="text-2xl font-bold text-secondary mb-6">Оформити замовлення</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Ім&apos;я <span className="text-red-500 font-bold">*</span>
          </label>
          <input
            type="text"
            id="name"
            required
            value={customerInfo.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-orange-50"
            placeholder="Ваше ім&apos;я"
          />
        </div>

        <div>
          <label htmlFor="surname" className="block text-sm font-medium text-gray-700 mb-1">
            Прізвище <span className="text-red-500 font-bold">*</span>
          </label>
          <input
            type="text"
            id="surname"
            required
            value={customerInfo.surname}
            onChange={(e) => handleInputChange("surname", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-orange-50"
            placeholder="Ваше прізвище"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Телефон <span className="text-red-500 font-bold">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            required
            value={customerInfo.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-orange-50"
            placeholder="+380 50 123 45 67"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={customerInfo.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="your@email.com"
          />
        </div>

        {/* NP City autocomplete */}
        <div>
          <label htmlFor="npCity" className="block text-sm font-medium text-gray-700 mb-1">
            Місто (Нова Пошта) <span className="text-red-500 font-bold">*</span>
            {!customerInfo.npCityRef && customerInfo.npCityName && (
              <span className="text-red-500 text-xs ml-2">⚠️ Оберіть місто зі списку</span>
            )}
          </label>
          <input
            id="npCity"
            type="text"
            value={customerInfo.npCityName ?? cityQuery}
            onChange={(e) => {
              setCustomerInfo(prev => ({ ...prev, npCityName: undefined, npCityRef: undefined, npWarehouseRef: undefined, npWarehouseNumber: undefined, npWarehouseAddress: undefined }));
              setCityQuery(e.target.value);
            }}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-orange-50 ${
              !customerInfo.npCityRef && customerInfo.npCityName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Почніть вводити місто..."
            autoComplete="off"
          />
          {cityLoading && <p className="text-sm text-gray-500 mt-1">Пошук міст...</p>}
          {!cityLoading && cityResults.length > 0 && !customerInfo.npCityRef && (
            <ul className="mt-2 max-h-56 overflow-auto border border-gray-200 rounded-md bg-white divide-y">
              {cityResults.map((c) => (
                <li key={c.DeliveryCity}>
                  <button
                    type="button"
                    onClick={() => {
                      setCustomerInfo(prev => ({ ...prev, npCityName: c.Present, npCityRef: c.DeliveryCity }));
                      setCityQuery(c.Present);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-orange-50"
                  >
                    {c.Present}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* NP Warehouse selector */}
        <div>
          <label htmlFor="npWarehouse" className="block text-sm font-medium text-gray-700 mb-1">
            Відділення Нової Пошти <span className="text-red-500 font-bold">*</span>
            {customerInfo.npCityRef && !customerInfo.npWarehouseRef && (
              <span className="text-red-500 text-xs ml-2">⚠️ Оберіть відділення</span>
            )}
          </label>
          <select
            id="npWarehouse"
            disabled={!customerInfo.npCityRef || warehousesLoading}
            value={customerInfo.npWarehouseRef ?? ""}
            onChange={(e) => {
              const ref = e.target.value;
              const w = warehouses.find(w => w.Ref === ref);
              setCustomerInfo(prev => ({
                ...prev,
                npWarehouseRef: ref || undefined,
                npWarehouseNumber: w ? w.Number : undefined,
                npWarehouseAddress: w ? (w.ShortAddress || w.Description) : undefined,
              }));
            }}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-orange-50 ${
              customerInfo.npCityRef && !customerInfo.npWarehouseRef ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="" disabled>{warehousesLoading ? "Завантаження..." : (!customerInfo.npCityRef ? "Спочатку оберіть місто" : "Оберіть відділення")}</option>
            {warehouses.map((w) => (
              <option key={w.Ref} value={w.Ref}>
                {`Відділення №${w.Number}: ${w.ShortAddress || w.Description}`}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">
            Коментарі до замовлення
          </label>
          <textarea
            id="comments"
            value={customerInfo.comments}
            onChange={(e) => handleInputChange("comments", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            rows={3}
            placeholder="Додаткові побажання або коментарі"
          />
        </div>
        {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-white py-3 px-4 rounded-md font-semibold hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Відправляємо..." : "Відправити замовлення"}
        </button>
      </form>
    </div>
  );
}

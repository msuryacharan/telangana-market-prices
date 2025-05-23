export interface MarketData {
  id: number;
  date: string;
  district: string;
  market: string;
  product: string;
  price_per_kg: number;
  price_per_quintal?: number;
  previous_day_price?: number;
  price_change_percentage?: number;
}

export interface FilterProps {
  districts: string[];
  markets: string[];
  onFilter: (district: string, market: string, date: string) => void;
}

export interface DataTableProps {
  data: MarketData[];
}

export interface HeaderProps {
  title?: string;
}

export interface FooterProps {
  year?: number;
}

export interface VisitorCounterProps {
  className?: string;
}
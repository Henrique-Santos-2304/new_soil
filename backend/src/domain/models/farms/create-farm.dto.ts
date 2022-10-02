class CreateFarmDTO {
  farm_id: string;
  farm_name: string;
  farm_city: string;
  farm_lat: number;
  farm_lng: number;
  owner_id: string;
  created_by: string;
  updated_by?: string;

  admins?: string[];
  dealers?: string[];
  users?: string[];
}

export { CreateFarmDTO };

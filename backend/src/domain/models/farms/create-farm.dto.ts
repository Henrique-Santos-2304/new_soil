class CreateFarmDTO {
  farm_id: string;
  farm_name: string;
  farm_city: string;
  farm_lat: number;
  farm_lng: number;

  admins?: string[];
  dealers?: string[];
  users?: string[];
}

export { CreateFarmDTO };

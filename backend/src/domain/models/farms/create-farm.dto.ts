class CreateFarmDTO {
  farm_id: string;
  farm_name: string;
  farm_city: string;
  farm_lat: number;
  farm_lng: number;

  admins_id: string[];
  dealer_id?: string[];
  user_id?: string[];
}

export { CreateFarmDTO };

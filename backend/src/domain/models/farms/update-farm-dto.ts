class UpdateFarmDTO {
  farm_id: string;
  farm_name: string;
  farm_city: string;
  farm_lat: number;
  farm_lng: number;
}

class UpdatedFarmDTORepo {
  farm_id?: string;
  farm_name?: string;
  farm_city?: string;
  farm_lat?: number;
  farm_lng?: number;
  updated_by: string;
}

export { UpdateFarmDTO, UpdatedFarmDTORepo };

export interface CookingClassRequest { 
    cookingClassRequestId?: number;   
    userId: number; 
    cookingClassId: number;  
    requestDate: string; 
    status: string;  
    dietaryPreferences: string; 
    cookingGoals: string;  
    comments?: string;  
}
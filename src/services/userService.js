import { httpAxios } from "@/helper/httpHelper";

export async function currentUser(){
    const result=await httpAxios
    .get("/api/current")
    .then(response)
}
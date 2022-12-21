import { RemindersUrl } from "../firebase/databaseConstants";
import { createListResource, deleteListResource, updateListResource } from "./rest-list-api";

export function createReminder(baseUrl: string, reminder: any) {
  const Url = baseUrl + RemindersUrl;
  createListResource(Url, reminder);
}

export function updateReminder(baseUrl: string, reminder: any, id: any) {
  const Url = baseUrl + RemindersUrl;
  updateListResource(Url, reminder, id);
}

export function deleteReminder(baseUrl: string, id: any) {
  const Url = baseUrl + RemindersUrl;
  deleteListResource(Url, id);
}

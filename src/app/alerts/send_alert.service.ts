import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { environment } from "src/environments/environment";


@Injectable()
export class sendAlertService {
    constructor(private http: HttpClient) {}
    addPushSubscriber(sub:any) {
        console.log("Adding push");
        return this.http.post(`${environment.apiIP}notifications`, sub);
      }
}

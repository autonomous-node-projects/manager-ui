import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";


@Injectable()
export class sendAlertService {
    constructor(private http: HttpClient) {}
    addPushSubscriber(sub:any) {
        console.log("Adding push");
        return this.http.post(`${process.env.apiIP}/notifications`, sub);
    }
}

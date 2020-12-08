import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from "@angular/common/http";

import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { _throw as throwError } from "rxjs/observable/throw";
import { environment } from "../environment.prod";

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const apiKey: string = environment.apiKey;
    request = request.clone({ url: request.url + `?api_key=${apiKey}` });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log("event", event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        let data = {};
        data = {
          reason:
            error && error.error && error.error.reason
              ? error.error.reason
              : "",
          status: error.status,
        };
        // handle error with toast or dialog
        return throwError(error);
      })
    );
  }
}

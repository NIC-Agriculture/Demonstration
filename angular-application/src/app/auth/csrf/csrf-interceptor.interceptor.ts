import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LayoutserviceService } from 'src/app/services/layoutservice.service'


@Injectable()
export class CsrfInterceptorInterceptor implements HttpInterceptor {

  constructor(
    private layoutService : LayoutserviceService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = this.layoutService.getUserToken();
    const isSkip = request.headers.get('skip');
    
    const modifiedRequest = request.clone({
      withCredentials: true,
      setHeaders: {
        // 'csrf-token': userToken,
        'Authorization': `Bearer ${accessToken}`
      }
    });
    let newRequest = request.clone({
          headers: request.headers.delete('skip')
    });
    return next.handle(isSkip == 'true' ? newRequest : modifiedRequest);

  }
}


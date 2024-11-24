import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  PipeTransform,
  Injectable,
  ArgumentMetadata,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { snakeCase, camelCase, mapKeys } from 'lodash';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseTransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // standard :- converting the response to snake_case
        return mapKeys(data, (value, key) => snakeCase(key));
      }),
    );
  }
}

@Injectable()
// standard :- converting the incoming request payload to camelCase
export class RequestTransformerPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'body') {
      return value;
    }

    const camelCasedValue = mapKeys(value, (v, k) => camelCase(k));
    return camelCasedValue;
  }
}

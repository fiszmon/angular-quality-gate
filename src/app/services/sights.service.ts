import {Injectable} from '@angular/core';
import {SightseeingPoint} from '../models/sightseeing-point';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Country} from '../models/country';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SightsService {

  selectedSight: SightseeingPoint;

  constructor(private http: HttpClient) {
  }

  private static createSightFromAPIData(sight: SightseeingPoint): SightseeingPoint {
    const country = new Country(sight.country.name, sight.country.iata_code);

    return new SightseeingPoint(
      sight.name,
      sight.longitude,
      sight.latitude,
      country,
      sight.description,
      sight.color,
      sight.id
    );
  }

  private createMapSights(sights: SightseeingPoint[]): SightseeingPoint[] {
    return sights.map(sight => {
      return SightsService.createSightFromAPIData(sight);
    });
  }

  getSights(): Observable<SightseeingPoint[]> {
    return this.http.get<SightseeingPoint[]>(`${environment.apiUrl}/sights`).pipe(
      map(sights => {
        return this.createMapSights(sights);
      })
    );
  }

  getSight(id: string): Observable<SightseeingPoint> {
    return this.http.get<SightseeingPoint>(`${environment.apiUrl}/sights/${id}`).pipe(
      map(sight => {
        return SightsService.createSightFromAPIData(sight);
      })
    );
  }

  addNew(sight: SightseeingPoint): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/sights`, sight);
  }

  update(sight: SightseeingPoint): Observable<void> {
    return this.http.put<void>(`${environment.apiUrl}/sights/${sight.id}`, sight);
  }
}

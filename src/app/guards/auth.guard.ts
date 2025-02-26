import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.user$.pipe(
      take(1),
      map((user) => {
        // ユーザーが認証されていない場合はログインページにリダイレクト
        if (!user) {
          this.router.navigate(['/login']);
          return false;
        }

        // 必要な権限をルートデータから取得
        const requiredRole = route.data['requiredRole'] as string;
        const requiredGroupAccess = route.data[
          'requiredGroupAccess'
        ] as boolean;

        // グループIDをルートパラメータから取得
        const groupId = route.paramMap.get('groupId');

        // 権限チェック
        if (
          requiredRole === 'developer' &&
          !this.authService.isDeveloper(user)
        ) {
          this.router.navigate(['/access-denied']);
          return false;
        }

        // グループアクセスのチェック
        if (requiredGroupAccess && groupId) {
          if (
            !this.authService.isDeveloper(user) &&
            !this.authService.isGroupLeader(user, groupId) &&
            !this.authService.isGroupMember(user, groupId)
          ) {
            this.router.navigate(['/access-denied']);
            return false;
          }
        }

        return true;
      })
    );
  }
}

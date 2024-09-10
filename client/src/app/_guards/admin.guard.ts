import { CanActivateFn } from '@angular/router';
import { AccountsService } from '../_services/accounts.service';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const accounService = inject(AccountsService);
  const toastr = inject(ToastrService);

  if(accounService.roles()?.includes('Admin')  || accounService.roles()?.includes('Moderator')) return true;
  else {
    toastr.error('You cannot enter this area');
    return false;
  }
};

# 8b8a08fa-018d-4c99-adb9-1c63fedffd66-3e18c4ab-fae2-4018-886d-f22d52c9f031
https://sonarcloud.io/summary/overall?id=iamneo-production_8b8a08fa-018d-4c99-adb9-1c63fedffd66-3e18c4ab-fae2-4018-886d-f22d52c9f031




<h1>Cooking Hub</h1>
<nav class="navbar">
  <ul>
    <!-- Home Link -->
    <li>
      <a routerLink="/home" routerLinkActive="active">Home</a>
    </li>

    <!-- Class Request Link -->
    <li>
      <a routerLink="/user/add-request">Class Request</a>
    </li>

    <!-- Cooking Class Feedback Link -->
    <li>
      <a routerLink="/admin/view-feedback">Feedback</a>
    </li>

    <!-- Logout Link -->
    <li>
      <a routerLink="/home" (click)="logout()">Logout</a>
    </li>
  </ul>
</nav>



<div class="lg:hidden" role="dialog" aria-modal="true">
    <!-- Background backdrop, show/hide based on slide-over state. -->
    <div class="fixed inset-0 z-50"></div>
    <div
      class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
      <div class="flex items-center justify-between">
        <a href="#" class="-m-1.5 p-1.5">
          <span class="sr-only">Your Company</span>
          <img class="h-8 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            alt="">
        </a>
        <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700">
          <span class="sr-only">Close menu</span>
          <svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            aria-hidden="true" data-slot="icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="mt-6 flow-root">
        <div class="-my-6 divide-y divide-gray-500/10">
          <div class="space-y-2 py-6">
            <a href="#"
              class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Home</a>
            <a href="#"
              class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Class
              Request</a>
            <a href="#"
              class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Feedback</a>
          </div>
          <div class="py-6">
            <a a routerLink="/home" (click)="logout()"
              class="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Logout</a>
          </div>
        </div>
      </div>
    </div>
  </div>
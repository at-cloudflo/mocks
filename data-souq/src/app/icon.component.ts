import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Inline SVG icon set from the Data Souq mockups. */
@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [':host { display: inline-flex; line-height: 0; }'],
  template: `
    @switch (name()) {
      @case ('home') {
        <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M3 8.2 9 3.2l6 5V15H3z"/></svg>
      }
      @case ('grid') {
        <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="5" height="5" rx="1"/><rect x="10" y="3" width="5" height="5" rx="1"/><rect x="3" y="10" width="5" height="5" rx="1"/><rect x="10" y="10" width="5" height="5" rx="1"/></svg>
      }
      @case ('star') {
        <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M9 2.8l1.9 3.9 4.3.6-3.1 3 .7 4.3L9 12.6l-3.8 2 .7-4.3-3.1-3 4.3-.6z"/></svg>
      }
      @case ('requests') {
        <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3.5" y="3" width="11" height="12" rx="1.5"/><path d="M6.5 7h5M6.5 10h5"/></svg>
      }
      @case ('collections') {
        <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="3" width="12" height="12" rx="2"/><path d="M9 6.5v5M6.5 9h5"/></svg>
      }
      @case ('glossary') {
        <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 3.5h7a3 3 0 0 1 3 3v8a2.5 2.5 0 0 0-2.5-2.5H4z"/><path d="M4 3.5V12"/></svg>
      }
      @case ('help') {
        <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="9" cy="9" r="6.5"/><path d="M7.2 7.2a1.9 1.9 0 1 1 2.6 1.8c-.5.2-.8.5-.8 1v.4"/></svg>
      }
      @case ('search') {
        <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="8" cy="8" r="5"/><path d="m12 12 3.5 3.5"/></svg>
      }
      @case ('arrow') {
        <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 8h10M9.5 4.5 13 8l-3.5 3.5"/></svg>
      }
      @case ('check') {
        <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2.2"><path d="m4 9.5 3.2 3L14 6"/></svg>
      }
      @case ('lock') {
        <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="8" width="10" height="7" rx="1.5"/><path d="M6 8V6a3 3 0 0 1 6 0v2"/></svg>
      }
      @case ('user') {
        <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="6.5" r="2.6"/><path d="M3.8 14.5c.6-2.6 2.6-4 5.2-4s4.6 1.4 5.2 4"/></svg>
      }
      @case ('users') {
        <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="2.6"/><path d="M2.8 14.5c.5-2.4 2-3.6 3.7-3.6s3.2 1.2 3.7 3.6"/><circle cx="12.5" cy="7.5" r="2.1"/><path d="M11.8 11.1c1.9 0 3.1 1.1 3.5 3.1"/></svg>
      }
      @case ('dataset') {
        <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M5 3h8v12l-4-2.6L5 15z"/></svg>
      }
      @case ('kpi') {
        <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 13.5 7 9l2.5 2.5L15 5"/><path d="M11 5h4v4"/></svg>
      }
      @case ('chart') {
        <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 13.5 7 9l2.5 2.5L15 5"/><path d="M11 5h4v4"/></svg>
      }
      @case ('box') {
        <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M9 2.5 15 5.5v7L9 15.5 3 12.5v-7z"/><path d="M3 5.5 9 8.5l6-3M9 8.5v7"/></svg>
      }
      @case ('shield') {
        <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M9 2.5c2 1.4 4.2 1.6 5.5 1.6 0 6-1.8 9.3-5.5 11.4C5.3 13.4 3.5 10.1 3.5 4.1c1.3 0 3.5-.2 5.5-1.6z"/><path d="m6.8 8.8 1.6 1.6 2.8-3"/></svg>
      }
      @case ('bank') {
        <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 7 9 3.5 15 7M4 7.5v6M7.3 7.5v6M10.7 7.5v6M14 7.5v6M2.8 14h12.4"/></svg>
      }
      @case ('diamond') {
        <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M9 3.2 14.8 9 9 14.8 3.2 9z"/></svg>
      }
      @case ('gear') {
        <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="9" cy="9" r="2.6"/><path d="M9 2.5v2M9 13.5v2M2.5 9h2M13.5 9h2M4.4 4.4l1.4 1.4M12.2 12.2l1.4 1.4M13.6 4.4l-1.4 1.4M5.8 12.2l-1.4 1.4"/></svg>
      }
      @case ('receipt') {
        <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="2.8" width="10" height="12.4" rx="1.5"/><path d="M6.5 6h5M6.5 8.7h5M6.5 11.4h3"/></svg>
      }
      @case ('doc') {
        <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3.5" y="3" width="11" height="12" rx="1.5"/><path d="M6 6.2h6M6 8.6h6M6 11h3.5"/></svg>
      }
      @case ('org') {
        <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="9" cy="4.5" r="1.8"/><path d="M9 6.3v2.2M4.5 11.7v-1.5h9v1.5"/><circle cx="4.5" cy="13.5" r="1.6"/><circle cx="9" cy="13.5" r="1.6"/><circle cx="13.5" cy="13.5" r="1.6"/></svg>
      }
      @case ('logout') {
        <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M11 3H5a1.5 1.5 0 0 0-1.5 1.5v9A1.5 1.5 0 0 0 5 15h6"/><path d="M8 9h7.5M12.8 6.2 15.5 9l-2.7 2.8"/></svg>
      }
      @case ('plane') {
        <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 24 24" fill="currentColor"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>
      }
    }
  `,
})
export class IconComponent {
  readonly name = input.required<string>();
  readonly size = input<number>(18);
}

import Dialog from '@/components/ui/Dialog';

// every rank holder of a year; filled and opened by ./ranks-dialog.js
export default function RanksDialog() {
  return <Dialog id="yd" titleId="ydH" closeId="ydClose" list="ol" listClass="dlg__list" listId="ydList" />;
}

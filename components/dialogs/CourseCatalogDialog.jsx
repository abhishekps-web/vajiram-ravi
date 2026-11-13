import Dialog from '@/components/ui/Dialog';

// a category's courses (or all of them); filled and opened by ./course-catalog.js
export default function CourseCatalogDialog() {
  return <Dialog id="courseDlg" className="dlg dlg--cat" titleId="courseDlgH" title="All courses" closeId="courseDlgX" listClass="dlg__cat" listId="courseList" />;
}

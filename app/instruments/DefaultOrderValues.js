export class DefaultOrderValues {
  constructor(formValues = null) {
    this.type_of_paper = formValues && formValues.type_of_paper[18] || '';
    this.academic_level = formValues && formValues.academic_level[1] || '';
    this.paper_format = formValues && formValues.paper_format[0] || '';
    this.deadline = formValues && formValues.deadline[0] || '';
    this.subject_or_discipline = formValues && formValues.subject_or_discipline[0] || '';
    this.spacing = 1;
    this.number_of_pages = 1;
    this.number_of_sources = 0;
    this.number_of_slides = 0;
    this.number_of_charts = 0;
    this.paper_details = '';
    this.customer_name = '';
    this.phone = '';
    this.preferred_writer = '';
    this.discount_code = '';
    this.topic = '';
    this.price = '';
    this.files = [];
    this.options = {
      advanced_writer_price: '',
      editing_price: '',
      extended_revision_period_price: '',
      initial_draft_price: '',
      one_page_summary_price: '',
      plagiarism_report_price: '',
      source_copy_price: '',
      vip_support_price: '',
    }
  }
}

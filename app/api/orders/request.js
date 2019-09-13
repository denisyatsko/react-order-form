class UploadFilesRequest {
  constructor(data) {
    this.document = data.order.document;
    this.order_id = data.order.id;
    //this.sub_order_id = data.sub_order_id; // option
  }
}

class OrderSubmitRequest {
  constructor(data) {
    this.customer_name = data.customer_name;
    this.customer_phone = data.customer_phone;
    this.city = ''; // this data is not in the order
    this.country = ''; // this data is not in the order
    this.country_code = ''; // this data is not in the order
    this.payment = ''; // this data is not in the order
    this.type_of_paper = data.type_of_paper.value;
    this.other_type_of_paper = ''; // this data is not in the order
    this.academic_level = data.academic_level.value;
    this.subject_or_discipline = data.subject_or_discipline.value;
    this.other_discipline = ''; // this data is not in the order
    this.title = ''; // this data is not in the order
    this.topic = data.topic;
    this.paper_details = data.paper_details;
    this.number_of_charts = data.number_of_charts;
    this.number_of_pages = data.number_of_pages;
    this.number_of_slides = data.number_of_slides;
    this.paper_format = data.paper_format.value;
    this.other_paper_format = ''; // this data is not in the order
    this.number_of_sources = data.number_of_sources;
    this.preferred_writer = data.preferred_writer;
    this.discount_code = data.discount_code;
    this.discount_code_order = ''; // this data is not in the order
    this.discount_life = ''; // this data is not in the order
    this.spacing = data.spacing;
    this.spinner_hours = ''; // this data is not in the order
    this.key_wpg = ''; // this data is not in the order
    this.sub_id = ''; // this data is not in the order
    this.advanced_writer_required = data.advanced_writer_required;
    this.digital_copies_required = data.digital_copies_required;
    this.additional_editing_required = data.additional_editing_required;
    this.plagiarism_report_required = data.plagiarism_report_required;
    this.initial_draft_required = data.initial_draft_required;
    this.one_page_summary_required = data.one_page_summary_required;
    this.extended_revision_period_required = data.extended_revision_period_required;
    this.vip_support_required = data.vip_support_required;
    this.deadline = data.deadline.value;
    this.timezone = ''; // this data is not in the order
    this.price = data.price;
    this.ga_cid = ''; // this data is not in the order
    this.currency = ''; // this data is not in the order
    this.partner_code = ''; // this data is not in the order
    this.partner_ref_id = ''; // this data is not in the order
  }
}

export {
  UploadFilesRequest,
  OrderSubmitRequest,
};

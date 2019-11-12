class UploadFilesRequest {
  constructor(data) {
    this.document = data.document;
    this.order_id = data.id;
    //this.sub_order_id = data.sub_order_id; // option
  }
}

class GetOrderFilesRequest {
  constructor(data) {
    this.order_id = data.id;
    //this.sub_order_id = data.sub_order_id; // option
  }
}

class GetMessagesRequest {
  constructor(data) {
    this.order_id = data.id;
    //this.sub_order_id = data.sub_order_id; // option
  }
}

class SendMessageRequest {
  constructor(data) {
    this.message = data.sendingMessage;
    this.order_id = data.id;
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
    this.advanced_writer_required = data.options.advanced_writer_price ? 1 : 0;
    this.additional_editing_required = data.options.editing_price ? 1 : 0;
    this.extended_revision_period_required = data.options.extended_revision_period_price ? 1 : 0;
    this.initial_draft_required = data.options.initial_draft_price ? 1 : 0;
    this.one_page_summary_required = data.options.one_page_summary_price ? 1 : 0;
    this.plagiarism_report_required = data.options.plagiarism_report_price ? 1 : 0;
    this.digital_copies_required = data.options.source_copy_price ? 1 : 0;
    this.vip_support_required = data.options.vip_support_price ? 1 : 0;
    this.deadline = data.deadline.value;
    this.timezone = ''; // this data is not in the order
    this.price = data.price;
    this.ga_cid = ''; // this data is not in the order
    this.currency = ''; // this data is not in the order
    this.partner_code = ''; // this data is not in the order
    this.partner_ref_id = ''; // this data is not in the order
  }
}

class GetOrderRequest {
  constructor(id) {
    this.order_id = id;
  }
}

export {
  GetOrderRequest,
  SendMessageRequest,
  UploadFilesRequest,
  OrderSubmitRequest,
  GetMessagesRequest,
  GetOrderFilesRequest,
};

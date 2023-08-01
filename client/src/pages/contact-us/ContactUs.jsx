import "./contact-us.css";

function ContactUs() {
  return (
    <div className="contact-us">
      <div className="contact-us-item about-app">
        <h4 className="contact-us-item-title">عن التطبيق</h4>
        <p className="contact-us-item-desc">
          تطبيق يهدف لربط مقدمي خدمات صيانة السيارات بأصحاب السيارات، ويسعي
          لتقديم أفضل تجربة لمالك السيارة.
        </p>
      </div>
      <div className=" contact-us-item target">
        <h4 className="contact-us-item-title">أهدافنا</h4>
        <p className="contact-us-item-desc">
          نهدف إلي تنظيم سوق صيانة وقطع غيار السيارات وتقديم أفضل تجربة لأصحاب
          السيارات من خلال توفير نظام يمكنهم من تقييم مقدمي الخدمات والبحث عن
          أفضل مقدم خدمة بجواره
        </p>
      </div>
      <div className="contact-us-item founders">
        <h4 className="contact-us-item-title">المؤسسين</h4>
        <div className="founders-wrapper">
          <div className="founder-item">
            <img src="/images/founder1.jpg" alt="" className="founder-image" />
            <p className="founder-name">إبراهيم محمد</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;

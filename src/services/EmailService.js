const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const sendEmailCreateOrder = async (email, orderItems) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.EMAIL_ACCOUNT,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  let listItems = "";
  const attachImage = [];
  orderItems.forEach((item) => {
    listItems += `
    <div>
        <div>
            Bạn đã đặt sản phẩm <b>${item.name}</b> với số lượng <b>${
      item.amount
    }</b> và giá
            là <b>${item.price}</b>
        </div>
        <div>Hình ảnh sản phẩm</div>
        ${attachImage.push({ path: item.image })}
    </div>`;
  });

  const info = await transporter.sendMail({
    from: process.env.EMAIL_ACCOUNT, // sender address
    to: email, // list of receivers
    subject: "Bạn đã đặt hàng thành công tại PeggyBooks!", // Subject line
    text: "Hello world?", // plain text body
    html: `
    <div>
        <b>Bạn đã đặt hàng thành công tại PeggyBooks!</b>
        ${listItems}
    </div>`, // html body
    attachments: attachImage,
  });
};

const sendEmailDeleteOrder = async (email, order) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.EMAIL_ACCOUNT,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_ACCOUNT, // sender address
    to: email, // list of receivers
    subject: `Đơn hàng có mã DH${order?._id} đã được hủy thành công!`, // Subject line
    text: "Hello world?", // plain text body
    html: `
    <div>
      <p>Chào <strong>${order?.shippingAddress?.fullName}</strong>,</p>
      <p>
        Chúng tôi xin thông báo rằng đơn hàng của bạn với mã số <strong>DH${order?._id}</strong> đã được hủy thành công. Nếu bạn có bất kỳ thắc mắc hoặc cần hỗ trợ thêm, xin vui lòng liên hệ với chúng tôi qua <a href="mailto:kuroko3105@gmail.com">kuroko3105@gmail.com</a>.
      </p>
      <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</p>
      <p>Trân trọng,<br>
      [Đội Ngũ Hỗ Trợ Khách Hàng]<br>
      PeggyBooks Shop</p>
    </div>`, // html body
  });
};

module.exports = {
  sendEmailCreateOrder,
  sendEmailDeleteOrder,
};

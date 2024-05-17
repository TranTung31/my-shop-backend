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
            Bạn đã đặt sản phẩm <b>${item.name}</b> với số lượng <b>${item.amount}</b> và giá
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

module.exports = {
  sendEmailCreateOrder,
};

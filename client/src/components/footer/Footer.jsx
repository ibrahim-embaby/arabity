import "./footer.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";
import LinkedIn from "@mui/icons-material/LinkedIn";
function Footer() {
  return (
    <div className="footer">
      <div className="footer-left">عربيتي</div>
      <div className="footer-right">
        <p className="footer-right-icon facebook">
          <FacebookIcon sx={{ fontSize: 35 }} />
        </p>
        <p className="footer-right-icon instagram">
          <Instagram sx={{ fontSize: 35 }} />
        </p>
        <p className="footer-right-icon linkedin">
          <LinkedIn sx={{ fontSize: 35 }} />
        </p>
      </div>
    </div>
  );
}

export default Footer;

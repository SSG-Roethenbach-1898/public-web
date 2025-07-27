import smtplib, ssl
import logging, yaml
import textwrap
from email.mime.text import MIMEText
from fastapi.responses import JSONResponse

from app.model import ContactForm as CF
from app.const import CONFIG_PATH

class EmailService():
    ssl_context = ssl.create_default_context()
    smtp_server_ctx = None
    
    PORT = 465  # For SSL
    ADDRESS = ""
    PASSWORD = ""
    # Create a secure SSL context
    SMTP_SERVER = "adrastea.uberspace.de"
    
    def __init__(self):
        logging.info("Initializing EmailService...")
        
        config_service = ConfigService()
        config = config_service.get_config()
        self.SMTP_SERVER = config["smtp"]["server"]
        self.PORT = config["smtp"]["port"]
        self.ADDRESS = config["smtp"]["address"]
        self.PASSWORD = config["smtp"]["password"]
        logging.info("Config loaded.")
        
        logging.info("Connecting to SMTP server...")
        self.smtp_server_ctx = smtplib.SMTP_SSL(self.SMTP_SERVER, self.PORT, context=self.ssl_context)
        self.smtp_server_ctx.login(self.ADDRESS, self.PASSWORD)
        self.smtp_server_ctx.ehlo()
        logging.info("Connected to SMTP server.")
        logging.info("EmailService initialized.")
        
    def send_email(self, contactForm: CF):
        try:
            message = self.__create_email__(contactForm)
            message["Subject"] = f"Kontaktaufnahme von {contactForm.name}"
            message["From"] = self.ADDRESS
            message["To"] = self.ADDRESS
            
            self.smtp_server_ctx.sendmail(self.ADDRESS, self.ADDRESS, message.as_string())
            return JSONResponse(content={"message": f"Contact form submitted successfully."})
            
        except Exception as e:
            logging.error(f"Error sending email: {e}")
            return JSONResponse(content={"message": "An error occurred while sending the email."}, status_code=500)
    
    def __create_email__(self, contactForm: CF):
        # create email
        text = f"""{contactForm.message}
        
        ---------------------------------------
        Kontaktdaten:
        
        Anrede: {contactForm.anrede}
        Name: {contactForm.name}
        Email: {contactForm.email}
        Phone: {contactForm.phone}
        """
        
        message = MIMEText(textwrap.dedent(text), "plain")
        return message
    
class ConfigService():
    config = None
    
    def __init__(self):
        logging.info("Loading config...")
        self.config = self.__load_config__()
        
    def __load_config__(self):
        try:
            with open(CONFIG_PATH, "r") as file: 
                return yaml.safe_load(file)
        except Exception as e:
            logging.error(f"Error loading config: {e}")
            return e
    
    def get_config(self):
        return self.config
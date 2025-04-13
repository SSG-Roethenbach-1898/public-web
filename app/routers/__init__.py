import logging
import logging.config
import os


ROOT_LEVEL = os.environ.get('PROD', "DEBUG")

LOGGING_CONFIG = {
    "version": 1,
    "disable_existing_loggers": True,
    "formatters": {
        "standard": {"format": "%(levelname)s %(asctime)s %(name)s: %(message)s"},
    },
    "handlers": {
        "default": {
            "level": "INFO",
            "formatter": "standard",
            "class": "logging.StreamHandler",
            "stream": "ext://sys.stdout",  # Default is stderr
        },
    },
    "loggers": {
        "": {  # root logger
            "level": ROOT_LEVEL, #"INFO",
            "handlers": ["default"],
            "propagate": True,
        },
        "uvicorn.error": {
            "level": "INFO",
            "handlers": ["default"],
        },
        "uvicorn.access": {
            "level": "INFO",
            "handlers": ["default"],
        },
    },
}
logging.config.dictConfig(LOGGING_CONFIG)
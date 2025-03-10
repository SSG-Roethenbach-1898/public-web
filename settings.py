import logging, json


class CustomJSONFormatter(logging.Formatter):
    def __init__(self, fmt):
        logging.Formatter.__init__(self, fmt)

    def format(self, record):
        logging.Formatter.format(self, record)
        return json.dumps(get_log(record), indent=2)


def get_log(record):
    d = {
        "time": record.asctime,
        "process_name": record.processName,
        "process_id": record.process,
        "thread_name": record.threadName,
        "thread_id": record.thread,
        "level": record.levelname,
        "logger_name": record.name,
        "pathname": record.pathname,
        "line": record.lineno,
        "message": record.message,
    }

    if hasattr(record, "extra_info"):
        d["req"] = record.extra_info["req"]
        d["res"] = record.extra_info["res"]

    return d


LOGGING_CONFIG = { 
    'version': 1,
    'disable_existing_loggers': True,
    'formatters': {
        'standard': ...,  # same as above or customize that as well
        'custom_formatter': { 
            '()':  lambda: CustomJSONFormatter(fmt='%(asctime)s')           
        },
    },
    'handlers': { 
        'default': { 
            'formatter': 'standard',
            'class': 'logging.StreamHandler',
            'stream': 'ext://sys.stdout',  # Default is stderr
        },
        'stream_handler': { 
            'formatter': 'custom_formatter',
            'class': 'logging.StreamHandler',
            'stream': 'ext://sys.stdout',  # Default is stderr
        },
        'file_handler': { 
            'formatter': 'custom_formatter',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': 'app.log',
            'maxBytes': 1024 * 1024 * 1, # = 1MB
            'backupCount': 3,
        },
    },
    'loggers': { 
        'uvicorn': {
            'handlers': ['default', 'file_handler'],
            'level': 'TRACE',
            'propagate': False
        },
        'uvicorn.access': {
            'handlers': ['stream_handler', 'file_handler'],
            'level': 'TRACE',
            'propagate': False
        },
        'uvicorn.error': { 
            'handlers': ['stream_handler', 'file_handler'],
            'level': 'TRACE',
            'propagate': False
        },
        'uvicorn.asgi': {
            'handlers': ['stream_handler', 'file_handler'],
            'level': 'TRACE',
            'propagate': False
        },

    },
}
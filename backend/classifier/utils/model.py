import re
import pickle
from typing import Any

tokenize = re.compile(r'[\w\d]+')


def get_tokens(text):
    lines = []
    for line in text.split('\n'):
        lines += tokenize.findall(line.lower())

    return lines


class Unpickler(pickle.Unpickler):
    def find_class(self, __module_name: str, __global_name: str) -> Any:
        if __module_name == '__main__':
            __module_name = 'utils.model'
        return super().find_class(__module_name, __global_name)

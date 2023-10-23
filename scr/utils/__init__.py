from typing import List, Tuple
import unicodedata
import re
import csv

from nltk.stem.porter import PorterStemmer


def strip_accents(s: str) -> str:
    """
    Remove accents and diacritical marks from a text string.

    Args:
        s (str): The input text string to remove accents and diacritical marks from.

    Returns:
        str: The input text string with accents and diacritical marks removed.

    Example:
        >>> strip_accents("àáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ")
        'aaaaaaaeceeeeiiiiðnoooooøuuuuyþy'

    The function removes accents and diacritical marks from the input text string `s` using the `unicodedata` module from the Python standard library. It first normalizes the string to decomposed form using the 'NFD' normalization form, then removes all non-spacing marks ('Mn' category) from the resulting characters using a list comprehension.

    Returns the resulting string with no leading or trailing spaces.
    """
    return ''.join(c for c in unicodedata.normalize('NFD', s) if unicodedata.category(c) != 'Mn')


def strip_special_characters(s: str) -> str:
    """
    Remove special characters from a text string.

    Args:
        s (str): The input text string to remove special characters from.

    Returns:
        str: The input text string with special characters removed.

    Example:
        >>> text = "This is an example text with special characters!"
        >>> strip_special_characters(text)
        'This is an example text with special characters'

    The function removes any non-alphabetic character from the input text string `s` using a regular expression, and replaces them with a space character.

    Returns the resulting string with no leading or trailing spaces.
    """
    return re.sub(r"[^a-zA-Z]+", " ", s)


def get_stopwords():
    """
    Retrieve a set of stopwords from a file.

    Returns:
        str: A string containing a list of stopwords separated by newlines.

    Example:
        >>> stopwords = get_stopwords()
        >>> "the" in stopwords
        True

    The function retrieves a set of stopwords from a file located at "./utils/stopwords.txt" with the UTF-8 encoding. The file should contain one stopword per line, and no leading or trailing spaces.

    Returns the content of the file as a string.
    """
    with open("./utils/stopwords.txt", "r", encoding="utf-8") as file:
        return file.read()


def remove_stopwords(s: str) -> str:
    """
    Remove stopwords from a text string.

    Args:
        s (str): The input text string to remove stopwords from.

    Returns:
        str: The input text string with stopwords removed.

    Example:
        >>> text = "This is an example text with some stopwords."
        >>> remove_stopwords(text)
        'example text stopwords.'

    The function removes stopwords from the input text string `s` by splitting the string into a list of terms, removing any term that is found in a predefined set of stopwords obtained with the `get_stopwords` function, and joining the remaining terms with spaces.

    Returns the resulting string with no leading or trailing spaces.
    """
    stopwords = get_stopwords()
    s = " ".join(term if term.lower()
                 not in stopwords else "" for term in s.split(" "))
    return s


def normalize_text(s: str, stopwords: bool = True, steemer: bool = False) -> str:
    """
    Normalize and preprocess a text string.

    Args:
        s (str): The input text string to normalize.
        stopwords (bool): Whether to remove stopwords from the text. Defaults to True.

    Returns:
        str: The normalized text string.

    Example:
        >>> text = "This is an example text with some stopwords."
        >>> normalize_text(text)
        'THIS IS EXAMPLE TEXT SOME'

    The function normalizes the input text string `s` by converting all characters to uppercase, removing special characters with the `strip_special_characters` function, optionally removing stopwords with the `remove_stopwords` function if `stopwords` is True, removing accents with the `strip_accents` function, replacing newline characters with spaces, and removing extra spaces with a regular expression.

    If `stopwords` is True, the function removes a predefined set of stopwords from the text using the `remove_stopwords` function.

    Returns the resulting normalized string with leading and trailing spaces stripped.
    """
    s = s.upper()
    s = strip_special_characters(s)
    if stopwords:
        s = remove_stopwords(s)
    s = strip_accents(s)
    s = s.replace("\n", " ")
    s = re.sub(r" +", " ", s)
    s = s.strip()
    if steemer:
        steemer = PorterStemmer()
        s = steemer.stem(s)
    return s


def write_to_csv(output_path: str, fieldnames: List[str], values: List[Tuple], mode: str = "w") -> None:
    """
    Write a list of tuples to a CSV file.

    Args:
        output_path (str): The path to the output CSV file.
        fieldnames (List[str]): A list of strings containing the column names for the CSV file.
        values (List[Tuple]): A list of tuples containing the values to be written to the CSV file.
        mode (str): Specifies the mode in which the file is opened. 

    Returns:
        None

    Example:
        >>> data = [("apple", "red", 5), ("banana", "yellow", 2)]
        >>> write_to_csv("fruits.csv", ["name", "color", "qtd"], data)

    The function opens a file at `output_path` with the UTF-8 encoding, and writes the `fieldnames` as the header row, followed by the data in `values`. The CSV file is delimited with semicolons (;) and quoted with double quotes ("). If `fieldnames` is empty, the header row is omitted.

    Note that this function overwrites any existing file at `output_path`.
    """
    with open(output_path, mode, encoding="utf-8") as file:
        writer = csv.writer(file, delimiter=";", quotechar="\"")
        if fieldnames:
            writer.writerow(fieldnames)
        writer.writerows(values)
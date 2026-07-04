from src.text import slugify


def test_basic():
    assert slugify("Hello World!") == "hello-world"


def test_collapses_separators():
    assert slugify("a  b---c") == "a-b-c"


def test_strips_edges():
    assert slugify("  --trim me--  ") == "trim-me"

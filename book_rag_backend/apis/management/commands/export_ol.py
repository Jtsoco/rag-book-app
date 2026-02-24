# apis/management/commands/export_ol.py
from django.core.management.base import BaseCommand
from scripts.get_book_data import bulk_export
class Command(BaseCommand):
    help = "Fetch a list of Open Library works and write JSON."

    def add_arguments(self, parser):
        parser.add_argument("output", help="path to the output file")
        parser.add_argument("keys", nargs="+", help="work keys (e.g. OL82563W)")

    def handle(self, *args, **opts):
        bulk_export(opts["keys"], opts["output"])
        self.stdout.write(self.style.SUCCESS("wrote %s" % opts["output"]))

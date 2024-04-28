import xml.etree.ElementTree as ET
import pandas as pd
import re

# quick n dirty , switched to parse from loc
# def parse_xml_from_url(url)


def parse_xml_from_file(xml_file):
    try:
        tree = ET.parse(xml_file)  # save to csv
        root = tree.getroot()
    except FileNotFoundError:
        print("XML file not found.")
        return None
    titles = []
    start_dates = []
    end_dates = []
    atc_codes = []
    for item in root.findall('.//item'):
        title = item.find('title').text
        titles.append(title)
        content_encoded = item.find(
            './/{http://purl.org/rss/1.0/modules/content/}encoded').text
        category = item.find('.//category').text
        start_date_match = re.search(
            r'alkaa: (\d{4}-\d{2}-\d{2})', content_encoded)
        end_date_match = re.search(
            r'päättyy: (\d{4}-\d{2}-\d{2})', content_encoded)

        if start_date_match and end_date_match:
            start_dates.append(start_date_match.group(1))
            end_dates.append(end_date_match.group(1))
        else:
            start_dates.append(None)
            end_dates.append(None)
        atc_codes.append(category)
    df = pd.DataFrame({
        'Title': titles,
        'Start Date': start_dates,
        'End Date': end_dates,
        'ATC Code': atc_codes
    })

    return df


xml_file = "sampledatarss.xml"
df = parse_xml_from_file(xml_file)
print(df)
df.to_csv('output.csv', index=False)

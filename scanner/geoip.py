# resolve: país, ASN, cidade, provedor de internet a partir do IP

import geoip2.database

def geoip_lookup(ip):
    """
    Uses GeoLite2 to return:
    - country
    - city
    - ASN
    - provider
    """

    # Customizable: a geoip db must be downloaded locally
    reader = geoip2.database.Reader("GeoLite2-City.mmdb")

    try:
        info = reader.city(ip)
        return {
            "country": info.country.name,
            "city": info.city.name,
            "latitude": info.location.latitude,
            "longitude": info.location.longitude
        }
    except Exception:
        return {"error": "lookup failed"}
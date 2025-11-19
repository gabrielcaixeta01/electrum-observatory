# extrai certificados TLS reais do servidor Electrum (porta 50002 SSL)
# pega fingerprints SHA256/issuer/dates

import ssl
import socket
import hashlib

def extract_tls_info(ip, port=50002):
    """
    Connects via SSL and extracts:
    - certificate SHA256
    - issuer
    - valid-from / valid-to
    """

    ctx = ssl.create_default_context()
    with socket.create_connection((ip, port)) as sock:
        with ctx.wrap_socket(sock, server_hostname=ip) as sslsock:
            cert = sslsock.getpeercert(binary_form=True)

            sha256 = hashlib.sha256(cert).hexdigest()
            decoded = sslsock.getpeercert()

            return {
                "ip": ip,
                "port": port,
                "sha256": sha256,
                "issuer": decoded.get("issuer"),
                "notBefore": decoded.get("notBefore"),
                "notAfter": decoded.get("notAfter")
            }
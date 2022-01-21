function mesajGoster(icerik, baslik, durum) {
    switch (durum) {
        case "S":
            toastr.success(baslik, icerik, { timeOut: 5000 });
            break;
        case "I":
            toastr.info(baslik, icerik, { timeOut: 5000 });
            break;
        case "E":
            toastr.error(baslik, icerik, { timeOut: 5000 });
            break;
        case "W":
            toastr.warning(baslik, icerik, { timeOut: 5000 });
            break;
        default:
            toastr.success(baslik, icerik, { timeOut: 5000 });
            break;
    }
}




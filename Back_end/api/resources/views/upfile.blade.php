<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="upload" method="post" enctype="multipart/form-data">
    <input type="hidden" name="_token"value="{{csrf_token()}}">
        <input type="file" name="hinh">
        <input type="submit" value="nộp">
    </form>
    <img src="/storage/image/product/thangne1.png" alt="">
</body>
</html>
<?php

require __DIR__ . '/vendor/autoload.php';

use Endroid\QrCode\QrCode;
use Endroid\QrCode\Writer\PngWriter;
use Endroid\QrCode\Color\Color;
use Endroid\QrCode\Label\Label;
use Endroid\QrCode\Label\Alignment\LabelAlignmentCenter;
use Endroid\QrCode\Logo\Logo;
use Endroid\QrCode\ErrorCorrectionLevel\ErrorCorrectionLevelHigh;

$text = $_POST['text'] ?? '';

if (empty($text)) {
    die('No input text received.');
}

// QR setup
$qr = QrCode::create($text)
    ->setSize(500)
    ->setMargin(30)
    ->setErrorCorrectionLevel(new ErrorCorrectionLevelHigh)
    ->setForegroundColor(new Color(0, 0, 0))
    ->setBackgroundColor(new Color(255, 255, 255));

// Optional label and logo
$label = Label::create('TraceGreen Certified')
    ->setTextColor(new Color(0, 128, 0))
    ->setAlignment(new LabelAlignmentCenter);

// Optional logo (if path exists)
$logoPath = __DIR__ . '/logo.png'; // replace with your logo file path
$logo = file_exists($logoPath) ? Logo::create($logoPath)->setResizeToWidth(80) : null;

$writer = new PngWriter();
$result = $writer->write($qr, $logo, $label);

// Save QR code image to file
$result->saveToFile(__DIR__ . '/qr-code.png');

// Redirect back to form to show image
header("Location: index.html?success=1");
exit;


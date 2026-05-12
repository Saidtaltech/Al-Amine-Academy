<?php
// One-shot extractor for site.zip — auto-deletes itself + the zip when done.
// Token check so this URL can't be re-used.
$EXPECTED_TOKEN = 'aaa-2026-04-29';
$got = isset($_GET['t']) ? $_GET['t'] : '';
if ($got !== $EXPECTED_TOKEN) {
    http_response_code(403);
    echo "Forbidden";
    exit;
}

$zipPath = __DIR__ . '/site.zip';
$dest = __DIR__ . '/';

if (!file_exists($zipPath)) {
    echo "site.zip not found at $zipPath";
    exit;
}

if (!class_exists('ZipArchive')) {
    echo "ZipArchive not available — PHP zip extension missing";
    exit;
}

$zip = new ZipArchive();
$res = $zip->open($zipPath);
if ($res !== TRUE) {
    echo "Failed to open zip: code $res";
    exit;
}
$count = $zip->numFiles;
$ok = $zip->extractTo($dest);
$zip->close();

if (!$ok) {
    echo "Extraction failed";
    exit;
}

// Cleanup
@unlink($zipPath);
@unlink(__FILE__);

echo "OK — extracted $count files. Self-deleted.";

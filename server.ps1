# Ultra-fast, robust MERN API + Static HTTP server for local serving
param([int]$Port = 8080)

$ip = [System.Net.IPAddress]::Loopback
$listener = [System.Net.Sockets.TcpListener]::new($ip, $Port)

try {
    $listener.Start()
    Write-Host "🚀 BarrierVerse MERN + Static Server listening on http://localhost:$Port/ and http://127.0.0.1:$Port/"
} catch {
    Write-Host "Could not bind port $Port : $_"
    exit 1
}

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".svg"  = "image/svg+xml"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".ico"  = "image/x-icon"
}

$baseDir = (Get-Location).Path

while ($true) {
    try {
        $client = $listener.AcceptTcpClient()
        $stream = $client.GetStream()
        $stream.ReadTimeout = 1500
        
        $buffer = New-Object byte[] 4096
        $bytesRead = $stream.Read($buffer, 0, $buffer.Length)
        
        if ($bytesRead -gt 0) {
            $reqText = [System.Text.Encoding]::UTF8.GetString($buffer, 0, $bytesRead)
            $firstLine = $reqText.Split([string[]]@("`r`n", "`n"), [System.StringSplitOptions]::None)[0]
            $parts = $firstLine.Split(' ')

            if ($parts.Length -ge 2) {
                $rawPath = $parts[1].Split('?')[0]

                # MERN API Routes Handling
                if ($rawPath.StartsWith("/api/stats")) {
                    $jsonBody = '{"success":true,"data":{"barriersReported":4829,"barriersFixed":1412,"organizationsJoined":218,"activeVolunteers":3490,"citiesCovered":42}}'
                    $bodyBytes = [System.Text.Encoding]::UTF8.GetBytes($jsonBody)
                    $header = "HTTP/1.1 200 OK`r`nContent-Type: application/json`r`nContent-Length: $($bodyBytes.Length)`r`nAccess-Control-Allow-Origin: *`r`nConnection: close`r`n`r`n"
                    $headerBytes = [System.Text.Encoding]::UTF8.GetBytes($header)
                    $stream.Write($headerBytes, 0, $headerBytes.Length)
                    $stream.Write($bodyBytes, 0, $bodyBytes.Length)
                }
                elseif ($rawPath.StartsWith("/api/ai/analyze-barrier")) {
                    $jsonBody = '{"success":true,"data":{"model":"YOLOv8-BarrierNet","confidenceScore":0.94,"detections":[{"label":"Inaccessible Ramp Gradient","slopeRatio":"1:4.8 Slope","isHazardous":true}]}}'
                    $bodyBytes = [System.Text.Encoding]::UTF8.GetBytes($jsonBody)
                    $header = "HTTP/1.1 200 OK`r`nContent-Type: application/json`r`nContent-Length: $($bodyBytes.Length)`r`nAccess-Control-Allow-Origin: *`r`nConnection: close`r`n`r`n"
                    $headerBytes = [System.Text.Encoding]::UTF8.GetBytes($header)
                    $stream.Write($headerBytes, 0, $headerBytes.Length)
                    $stream.Write($bodyBytes, 0, $bodyBytes.Length)
                }
                else {
                    # Static file serving
                    if ($rawPath -eq "/" -or $rawPath -eq "") {
                        $rawPath = "/index.html"
                    }

                    $cleanPath = [System.Uri]::UnescapeDataString($rawPath.TrimStart('/'))
                    $fullPath = [System.IO.Path]::Combine($baseDir, $cleanPath)

                    if ([System.IO.File]::Exists($fullPath)) {
                        $bytes = [System.IO.File]::ReadAllBytes($fullPath)
                        $ext = [System.IO.Path]::GetExtension($fullPath).ToLower()
                        $mime = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }

                        $header = "HTTP/1.1 200 OK`r`nContent-Type: $mime`r`nContent-Length: $($bytes.Length)`r`nAccess-Control-Allow-Origin: *`r`nConnection: close`r`n`r`n"
                        $headerBytes = [System.Text.Encoding]::UTF8.GetBytes($header)
                        $stream.Write($headerBytes, 0, $headerBytes.Length)
                        $stream.Write($bytes, 0, $bytes.Length)
                    } else {
                        $notFound = "404 Not Found: $rawPath"
                        $bodyBytes = [System.Text.Encoding]::UTF8.GetBytes($notFound)
                        $header = "HTTP/1.1 404 Not Found`r`nContent-Type: text/plain`r`nContent-Length: $($bodyBytes.Length)`r`nConnection: close`r`n`r`n"
                        $headerBytes = [System.Text.Encoding]::UTF8.GetBytes($header)
                        $stream.Write($headerBytes, 0, $headerBytes.Length)
                        $stream.Write($bodyBytes, 0, $bodyBytes.Length)
                    }
                }
            }
        }

        $stream.Flush()
        $client.Close()
    } catch {
        # Loop gracefully
    }
}

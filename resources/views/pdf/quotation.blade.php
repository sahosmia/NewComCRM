@extends('pdf.layouts.master')

@section('title', 'Quotation - ' . $quotation->quotation_number)

@section('content')
    @php
        if (!function_exists('formatSouthAsian')) {
            function formatSouthAsian($num) {
                $parts = explode('.', number_format($num, 2, '.', ''));
                $whole = $parts[0];
                $decimal = $parts[1];

                $numStr = (string)$whole;
                if (strlen($numStr) <= 3) {
                    $formattedWhole = $numStr;
                } else {
                    $lastThree = substr($numStr, -3);
                    $restUnits = substr($numStr, 0, -3);
                    $restUnits = preg_replace("/\B(?=(\d{2})+(?!\d))/", ",", $restUnits);
                    $formattedWhole = $restUnits . ',' . $lastThree;
                }

                return $decimal != '00' ? $formattedWhole . '.' . $decimal : $formattedWhole;
            }
        }

        if (!function_exists('numberToWords')) {
            function numberToWords($number) {
                $hyphen      = ' ';
                $conjunction = ' ';
                $separator   = ' ';
                $negative    = 'negative ';
                $decimal     = ' point ';
                $dictionary  = array(
                    0                   => 'zero',
                    1                   => 'one',
                    2                   => 'two',
                    3                   => 'three',
                    4                   => 'four',
                    5                   => 'five',
                    6                   => 'six',
                    7                   => 'seven',
                    8                   => 'eight',
                    9                   => 'nine',
                    10                  => 'ten',
                    11                  => 'eleven',
                    12                  => 'twelve',
                    13                  => 'thirteen',
                    14                  => 'fourteen',
                    15                  => 'fifteen',
                    16                  => 'sixteen',
                    17                  => 'seventeen',
                    18                  => 'eighteen',
                    19                  => 'nineteen',
                    20                  => 'twenty',
                    30                  => 'thirty',
                    40                  => 'forty',
                    50                  => 'fifty',
                    60                  => 'sixty',
                    70                  => 'seventy',
                    80                  => 'eighty',
                    90                  => 'ninety',
                    100                 => 'hundred',
                    1000                => 'thousand',
                    100000              => 'lac',
                    10000000            => 'crore'
                );

                if (!is_numeric($number)) {
                    return false;
                }

                $number = (int)$number;

                if ($number < 0) {
                    return $negative . numberToWords(abs($number));
                }

                $string = null;

                switch (true) {
                    case $number < 21:
                        $string = $dictionary[$number];
                        break;
                    case $number < 100:
                        $tens   = ((int) ($number / 10)) * 10;
                        $units  = $number % 10;
                        $string = $dictionary[$tens];
                        if ($units) {
                            $string .= $hyphen . $dictionary[$units];
                        }
                        break;
                    case $number < 1000:
                        $hundreds  = (int)($number / 100);
                        $remainder = $number % 100;
                        $string = $dictionary[$hundreds] . ' ' . $dictionary[100];
                        if ($remainder) {
                            $string .= $conjunction . numberToWords($remainder);
                        }
                        break;
                    case $number < 100000:
                        $thousands   = (int) ($number / 1000);
                        $remainder = $number % 1000;

                        $string = numberToWords($thousands) . ' ' . $dictionary[1000];
                        if ($remainder) {
                            $string .= $separator . numberToWords($remainder);
                        }
                        break;
                    case $number < 10000000:
                        $lacs   = (int) ($number / 100000);
                        $remainder = $number % 100000;

                        $string = numberToWords($lacs) . ' ' . $dictionary[100000];
                        if ($remainder) {
                            $string .= $separator . numberToWords($remainder);
                        }
                        break;
                    default:
                        $crores   = (int) ($number / 10000000);
                        $remainder = $number % 10000000;

                        $string = numberToWords($crores) . ' ' . $dictionary[10000000];
                        if ($remainder) {
                            $string .= $separator . numberToWords($remainder);
                        }
                        break;
                }

                return $string;
            }
        }
    @endphp

    {{-- Page 1: Introduction --}}
    <div class="page">
        <div style="text-align: right; margin-bottom: 30px;">
            <strong>Date:</strong> {{ $quotation->quotation_date->format('d M, Y') }}
        </div>

        <div style="margin-bottom: 30px;">
            <strong>To,</strong><br>
            <strong>{{ $quotation->customer->name }}</strong><br>
            @if($quotation->customer->designation)
                {{ $quotation->customer->designation }}<br>
            @endif
            @if($quotation->customer->company)
                <strong>{{ $quotation->customer->company->name }}</strong><br>
            @endif
            @if($quotation->customer->addresses && count($quotation->customer->addresses) > 0)
                {{ $quotation->customer->addresses[0] }}<br>
            @endif
            {{ $quotation->customer->phones[0] ?? '' }}
        </div>

        <div style="margin-bottom: 30px;">
            <strong>Subject: Quotation for Supply and Installation of Security Systems.</strong>
        </div>

        <div style="margin-bottom: 30px; line-height: 1.6;">
            Dear Sir,<br><br>
            With reference to your inquiry, we are pleased to submit our best technical and financial offer for your kind consideration. Crystal Vision Solutions specializes in providing comprehensive security equipment, networking hardware, and smart devices for corporate and residential sectors.<br><br>
            We take pride in our service quality and technical support, ensuring that our clients receive the best possible solutions for their requirements. Our proposed systems are selected to ensure longevity, ease of use, and integration with modern technologies.<br><br>
            Detailed specifications of our offer and the commercial terms are provided in the following pages.
        </div>
    </div>

    <div class="page-break"></div>

    {{-- Page 2: Financial Offer --}}
    <div class="page">
        <div style="margin-bottom: 20px; font-weight: bold; font-size: 14px; color: #ed1c24; border-bottom: 1px solid #ed1c24; padding-bottom: 5px;">
            Financial Offer
        </div>

        <style>
            .goods-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 20px;
            }
            .goods-table thead th {
                background-color: #4a4a4a;
                color: white;
                text-align: center;
                padding: 8px;
                border: 1px solid #333;
                font-size: 11px;
            }
            .goods-table td {
                padding: 8px;
                border: 1px solid #333;
                vertical-align: middle;
                font-size: 11px;
            }
            .text-center { text-align: center; }
            .text-right { text-align: right; }
            .font-bold { font-weight: bold; }
        </style>

        <table class="goods-table">
            <thead>
                <tr>
                    <th style="width: 30px;">SL</th>
                    <th>Description of Goods</th>
                    <th style="width: 70px;">Quantity</th>
                    <th style="width: 80px;">Unit Price (BDT)</th>
                    <th style="width: 90px;">Total (BDT)</th>
                </tr>
            </thead>
            <tbody>
                @foreach($quotation->items as $index => $item)
                <tr>
                    <td class="text-center">{{ str_pad($index + 1, 2, '0', STR_PAD_LEFT) }}</td>
                    <td>
                        <strong>{{ $item->product_name ?? ($item->product ? $item->product->name : 'N/A') }}</strong>
                        @if($item->product)
                            <br><span style="font-size: 10px; color: #555;">{{ $item->product->description }}</span>
                        @endif
                    </td>
                    <td class="text-center">{{ $item->quantity }}</td>
                    <td class="text-right">{{ formatSouthAsian($item->unit_price) }}</td>
                    <td class="text-right">{{ formatSouthAsian($item->total) }}/=</td>
                </tr>
                @endforeach
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="4" class="text-right font-bold">Subtotal</td>
                    <td class="text-right font-bold">{{ formatSouthAsian($quotation->subtotal) }}/=</td>
                </tr>
                @if($quotation->tax > 0)
                <tr>
                    <td colspan="4" class="text-right font-bold">VAT/Tax</td>
                    <td class="text-right">{{ formatSouthAsian($quotation->tax) }}/=</td>
                </tr>
                @endif
                @if($quotation->discount > 0)
                <tr>
                    <td colspan="4" class="text-right font-bold">Discount</td>
                    <td class="text-right">- {{ formatSouthAsian($quotation->discount) }}/=</td>
                </tr>
                @endif
                <tr style="background-color: #f9f9f9;">
                    <td colspan="4" class="text-right font-bold" style="font-size: 13px;">Grand Total</td>
                    <td class="text-right font-bold" style="font-size: 13px; color: #ed1c24;">{{ formatSouthAsian($quotation->total) }}/=</td>
                </tr>
            </tfoot>
        </table>

        <div style="margin-top: 10px;">
            <strong>Amount in word:</strong> {{ ucfirst(numberToWords($quotation->total)) }} only.
        </div>
    </div>

    <div class="page-break"></div>

    {{-- Page 3: Terms & Signature --}}
    <div class="page">
        <div style="margin-bottom: 20px; font-weight: bold; font-size: 14px; color: #ed1c24; border-bottom: 1px solid #ed1c24; padding-bottom: 5px;">
            Terms & Conditions
        </div>

        @if($quotation->terms_conditions)
            <div style="font-size: 11px; line-height: 1.8;">
                {!! nl2br(e($quotation->terms_conditions)) !!}
            </div>
        @else
            <div style="font-size: 11px; line-height: 1.8;">
                1. <strong>Validity:</strong> This quotation is valid for 15 days from the date of issuance.<br>
                2. <strong>Delivery:</strong> Within 3-5 working days after receipt of confirmed work order.<br>
                3. <strong>Payment:</strong> 50% advance with work order, 50% before delivery.<br>
                4. <strong>Warranty:</strong> As per manufacturer standard warranty policy.
            </div>
        @endif

        @if($quotation->notes)
        <div style="margin-top: 30px;">
            <h4 style="margin-bottom: 10px; text-decoration: underline;">Additional Notes:</h4>
            <div style="font-size: 11px; background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
                {!! nl2br(e($quotation->notes)) !!}
            </div>
        </div>
        @endif

        <div style="margin-top: 50px; line-height: 1.6;">
            We hope our offer will meet your requirements. Should you need any further information or clarification, please do not hesitate to contact us.<br><br>
            Sincerely yours,
        </div>

        <div class="signature-section" style="margin-top: 40px;">
            <div class="signature-box">
                @if($quotation->user && $quotation->user->signature)
                    <img src="{{ public_path('storage/' . $quotation->user->signature) }}" class="signature-img" alt="Signature">
                @else
                    <div style="height: 60px;"></div>
                @endif
                <div class="signature-line">
                    {{ $quotation->user->name ?? 'Authorized Signature' }}<br>
                    <span style="font-size: 10px; font-weight: normal;">{{ $quotation->user->role == 'super_admin' ? 'Super Admin' : 'Sales Executive' }}</span>
                </div>
            </div>
        </div>
    </div>
@endsection

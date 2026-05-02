@extends('pdf.layouts.master')

@section('title', 'Requirement - ' . ($requirement->title ?? $requirement->id))

@section('content')
    @php
        if (!function_exists('formatSouthAsian')) {
            function formatSouthAsian($num) {
                $num = round($num);
                $numStr = (string)$num;
                if (strlen($numStr) <= 3) {
                    return $numStr;
                }
                $lastThree = substr($numStr, -3);
                $restUnits = substr($numStr, 0, -3);
                $restUnits = preg_replace("/\B(?=(\d{2})+(?!\d))/", ",", $restUnits);
                return $restUnits . ',' . $lastThree;
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

        $aitFactor = 1;
        if ($requirement->has_ait && $requirement->ait_percentage < 100) {
            $aitFactor = 1 / (1 - ($requirement->ait_percentage / 100));
        }
    @endphp

    <div style="text-align: right; margin-bottom: 20px;">
        <strong>Date:</strong> {{ $requirement->created_at->format('d M, Y') }}
    </div>

    <div style="margin-bottom: 20px;">
        <strong>Customer Information:</strong><br>
        <strong>{{ $requirement->customer->name }}</strong><br>
        @if($requirement->customer->company)
            {{ $requirement->customer->company->name }}<br>
        @endif
        {{ $requirement->customer->phone }}
    </div>

    <div style="margin-bottom: 20px;">
        <strong>Subject: {{ $requirement->title ?? 'Requirement Specification' }}</strong>
    </div>

    <style>
        .goods-table {
            width: 100%;
            border-collapse: collapse;
        }
        .goods-table thead th {
            background-color: #4a4a4a;
            color: white;
            text-align: center;
            padding: 8px;
            border: 1px solid #333;
        }
        .goods-table td {
            padding: 8px;
            border: 1px solid #333;
            vertical-align: middle;
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
                <th style="width: 80px;">Quantity</th>
                <th style="width: 80px;">Unit Price</th>
                <th style="width: 100px;">Total</th>
            </tr>
        </thead>
        <tbody>
            @php $subTotal = 0; @endphp
            @foreach($requirement->items as $index => $item)
            @php
                $grossUnitPrice = $item->unit_price * $aitFactor;
                $grossTotalPrice = $grossUnitPrice * $item->quantity;
                $subTotal += $grossTotalPrice;
            @endphp
            <tr>
                <td class="text-center">{{ str_pad($index + 1, 2, '0', STR_PAD_LEFT) }}</td>
                <td>
                    <strong>{{ $item->product->name }}</strong>
                    @if($item->product->description)
                        - <span style="font-size: 11px; color: #333;">{{ $item->product->description }}</span>
                    @endif
                </td>
                <td class="text-center">{{ (int)$item->quantity }} {{ $item->product->unit?->short_form ?? 'Units' }}</td>
                <td class="text-right">{{ number_format($grossUnitPrice, 0) }}</td>
                <td class="text-right">{{ number_format($grossTotalPrice, 0) }}/=</td>
            </tr>
            @endforeach

            @php $sl = count($requirement->items); @endphp

            @if($requirement->has_accessories)
            @php
                $sl++;
                $grossAccessoriesPrice = $requirement->accessories_price * $aitFactor;
                $grossAccessoriesTotal = $grossAccessoriesPrice * $requirement->accessories_quantity;
                $subTotal += $grossAccessoriesTotal;
            @endphp
            <tr>
                <td class="text-center">{{ str_pad($sl, 2, '0', STR_PAD_LEFT) }}</td>
                <td>
                    <strong>{{ $requirement->accessories_title }}</strong>
                </td>
                <td class="text-center">{{ (int)$requirement->accessories_quantity }} {{ $requirement->accessoriesUnit?->short_form ?? 'Lot' }}</td>
                <td class="text-right">{{ number_format($grossAccessoriesPrice, 0) }}</td>
                <td class="text-right">{{ number_format($grossAccessoriesTotal, 0) }}/=</td>
            </tr>
            @endif

            @if($requirement->has_installation)
            @php
                $sl++;
                $grossInstallationPrice = $requirement->installation_price * $aitFactor;
                $grossInstallationTotal = $grossInstallationPrice * $requirement->installation_quantity;
                $subTotal += $grossInstallationTotal;
            @endphp
            <tr>
                <td class="text-center">{{ str_pad($sl, 2, '0', STR_PAD_LEFT) }}</td>
                <td>
                    <strong>{{ $requirement->installation_title }}</strong>
                </td>
                <td class="text-center">{{ (int)$requirement->installation_quantity }} {{ $requirement->installationUnit?->short_form ?? 'Units' }}</td>
                <td class="text-right">{{ number_format($grossInstallationPrice, 0) }}</td>
                <td class="text-right">{{ number_format($grossInstallationTotal, 0) }}/=</td>
            </tr>
            @endif
        </tbody>
        @php
            $vatAmount = $requirement->has_vat ? ($subTotal * ($requirement->vat_percentage / 100)) : 0;
            $grandTotal = $subTotal + $vatAmount;
        @endphp
        <tfoot>
            <tr>
                <td colspan="4" class="text-right font-bold">Total</td>
                <td class="text-right font-bold">{{ formatSouthAsian($subTotal) }}/=</td>
            </tr>
            @if($requirement->has_vat)
            <tr>
                <td colspan="4" class="text-right font-bold">VAT</td>
                <td class="text-right">{{ formatSouthAsian($vatAmount) }}/=</td>
            </tr>
            @endif
            <tr>
                <td colspan="4" class="text-right font-bold">Grand Total</td>
                <td class="text-right font-bold">{{ formatSouthAsian($grandTotal) }}/=</td>
            </tr>
        </tfoot>
    </table>

    <div style="margin-top: 10px;">
        <strong>Amount in word:</strong> {{ ucfirst(numberToWords($grandTotal)) }} only.
    </div>

    <div style="margin-top: 20px;">
        <h4 style="margin-bottom: 5px; text-decoration: underline;">Terms & Conditions:</h4>
        <div style="font-size: 11px;">
            <ul style="padding-left: 15px; margin: 0;">
                <li><strong>Price Validity:</strong> {{ $requirement->price_validity_days ?? 'N/A' }} Days</li>
                <li><strong>Delivery Time:</strong> {{ $requirement->delivery_time_days ?? 'N/A' }} Days</li>
                <li><strong>Payment Terms:</strong> {{ $requirement->advance_payment }}% Advance, {{ $requirement->before_payment }}% before delivery.</li>
                <li><strong>Delivery Location:</strong> {{ $requirement->delivery_location ?? 'As per discussion' }}</li>
            </ul>
        </div>
    </div>

    @if($requirement->notes)
    <div style="margin-top: 20px;">
        <strong>Notes:</strong><br>
        <span style="font-size: 11px;">{{ $requirement->notes }}</span>
    </div>
    @endif

@endsection

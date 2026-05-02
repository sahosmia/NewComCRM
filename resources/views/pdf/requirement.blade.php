@extends('pdf.layouts.master')

@section('title', 'Requirement - ' . ($requirement->title ?? $requirement->id))

@section('content')
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

    <table>
        <thead>
            <tr>
                <th class="text-center">SL</th>
                <th>Description</th>
                <th class="text-center">Quantity</th>
                <th class="text-right">Unit Price</th>
                <th class="text-right">Total</th>
            </tr>
        </thead>
        <tbody>
            @foreach($requirement->items as $index => $item)
            <tr>
                <td class="text-center">{{ $index + 1 }}</td>
                <td>
                    <strong>{{ $item->product->name }}</strong><br>
                    <span style="font-size: 10px; color: #666;">{{ $item->product->description }}</span>
                </td>
                <td class="text-center">{{ $item->quantity }} {{ $item->product->unit?->short_form }}</td>
                <td class="text-right">{{ number_format($item->unit_price, 2) }}</td>
                <td class="text-right">{{ number_format($item->total_price, 2) }}</td>
            </tr>
            @endforeach

            @if($requirement->has_accessories)
            <tr>
                <td class="text-center">{{ count($requirement->items) + 1 }}</td>
                <td>
                    <strong>{{ $requirement->accessories_title }}</strong> (Accessories)
                </td>
                <td class="text-center">{{ $requirement->accessories_quantity }} {{ $requirement->accessoriesUnit?->short_form }}</td>
                <td class="text-right">{{ number_format($requirement->accessories_price, 2) }}</td>
                <td class="text-right">{{ number_format($requirement->accessories_quantity * $requirement->accessories_price, 2) }}</td>
            </tr>
            @endif

            @if($requirement->has_installation)
            <tr>
                <td class="text-center">{{ count($requirement->items) + ($requirement->has_accessories ? 2 : 1) }}</td>
                <td>
                    <strong>{{ $requirement->installation_title }}</strong> (Installation)
                </td>
                <td class="text-center">{{ $requirement->installation_quantity }} {{ $requirement->installationUnit?->short_form }}</td>
                <td class="text-right">{{ number_format($requirement->installation_price, 2) }}</td>
                <td class="text-right">{{ number_format($requirement->installation_quantity * $requirement->installation_price, 2) }}</td>
            </tr>
            @endif
        </tbody>
        <tfoot>
            @php
                $itemsTotal = $requirement->items->sum('total_price');
                $accessoriesTotal = $requirement->has_accessories ? ($requirement->accessories_quantity * $requirement->accessories_price) : 0;
                $installationTotal = $requirement->has_installation ? ($requirement->installation_quantity * $requirement->installation_price) : 0;
                $subTotal = $itemsTotal + $accessoriesTotal + $installationTotal;
            @endphp

            @if($requirement->has_vat || $requirement->has_ait)
                <tr>
                    <td colspan="4" class="text-right font-bold">Sub-Total</td>
                    <td class="text-right">{{ number_format($subTotal, 2) }}</td>
                </tr>
                @if($requirement->has_vat)
                    <tr>
                        <td colspan="4" class="text-right font-bold">VAT ({{ $requirement->vat_percentage }}%)</td>
                        <td class="text-right">{{ number_format($subTotal * ($requirement->vat_percentage / 100), 2) }}</td>
                    </tr>
                @endif
                @if($requirement->has_ait)
                    <tr>
                        <td colspan="4" class="text-right font-bold">AIT Adjustment ({{ $requirement->ait_percentage }}%)</td>
                        <td class="text-right">{{ number_format($subTotal * ($requirement->ait_percentage / (100 - $requirement->ait_percentage)), 2) }}</td>
                    </tr>
                @endif
            @endif
            <tr>
                <td colspan="4" class="text-right font-bold" style="font-size: 14px;">Grand Total</td>
                <td class="text-right font-bold" style="font-size: 14px;">{{ number_format($requirement->grand_total, 2) }}</td>
            </tr>
        </tfoot>
    </table>

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

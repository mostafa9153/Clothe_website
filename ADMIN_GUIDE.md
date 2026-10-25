# MAISON AURÉ — CLIENT STAFF OPERATING MANUAL

> **Staff & Store Manager Guide**  
> A non-technical reference guide for store managers, fulfillment teams, and customer concierge staff to run the online atelier.

---

## 🔑 Accessing the Admin Panel

- **URL**: `https://yourdomain.com/admin`
- **Login**: Visit `/account/login` using your staff credentials. If your account role is set to `admin`, you will be granted access immediately.
- **Security**: The admin suite automatically logs out inactive sessions and requires HTTPS encryption.

---

## 1. Daily Operations Dashboard (`/admin`)

The dashboard gives a real-time pulse of your atelier's commercial performance:

- **KPI Cards**:
  - **Today's Revenue**: Net domestic sales completed today.
  - **Active Orders**: Orders requiring packaging or fulfillment action.
  - **Average Order Value (AOV)**: Average commission size.
  - **Low Stock Pieces**: Garments with ≤ 5 units in reserve across sizes.
- **Revenue Trajectory Chart**: 30-day graphic curve illustrating daily revenue.
- **Urgent Action Queue**: Direct links to pending returns, unanswered concierge messages, and low stock warnings.

---

## 2. Managing Products & Inventory (`/admin/products` & `/admin/inventory`)

### Adding a New Garment:
1. Navigate to **Catalog > Products** and click **"+ Add New Piece"**.
2. **Basics**: Enter Title (e.g. *Mulberry Silk Bias Slip Dress*), slug, and category.
3. **Pricing & GST**: Enter base retail price. Select statutory GST bracket (5% or 12%).
4. **Story & Care**: Enter fabric provenance (e.g. *24-momme silk, Karnataka sericulture*), tailoring fit notes, and care instructions.
5. **Images**: Drag and drop photography. The system automatically compresses photos to WebP format (≤ 300KB) to ensure rapid mobile loading.
6. **Variant Matrix**: Choose available sizes (`XS`, `S`, `M`, `L`, `XL`) and colors. Enter initial stock for each combination.
7. Click **"Publish Piece to Atelier"**.

### Inline Inventory Editing:
In the **Inventory** view, click directly on any stock number to update reserve quantities. When a sold-out piece is restocked, patrons who signed up for restock notifications can be notified with a single click.

---

## 3. Order Processing & Fulfillment (`/admin/orders`)

Every order follows a strict luxury lifecycle:

```
Placed ──> Confirmed ──> Packed ──> Shipped ──> Out for Delivery ──> Delivered
                                      │
                                      └──> Tracking # & Courier dispatched
```

### Steps to Fulfill an Order:
1. Open the order from the **Orders Table**.
2. Inspect ordered garments, size specifications, and any **Gift Wrap Message**.
3. Once packed in protective cotton dustbags and sealed with the atelier emblem, change status to **"Packed"**.
4. When handed to the courier (Blue Dart, Delhivery, etc.), enter the **Courier Name** and **Tracking AWB Number**.
5. Change status to **"Shipped"**. The patron automatically receives a luxury dispatch email containing the tracking link.

### Handling Cancellations:
If an order is cancelled prior to dispatch, click **"Cancel Order"**. The platform automatically restocks the garment inventory back to the live storefront instantaneously.

---

## 4. Customer Returns & Exchanges (`/admin/returns`)

Patrons may request doorstep returns within your configured window (default: 10 days).

1. Review the patron's return reason and photos under **Returns**.
2. Click **"Approve Return & Schedule Pickup"**. Your courier partner will collect the parcel from the patron's doorstep.
3. Upon arrival at the atelier, inspect garment seals. If verified unwashed and unworn, click **"Complete & Issue Refund"**.

---

## 5. Homepage & Banner Manager (`/admin/content`)

Update your storefront visually without touching code:

- **Hero Carousel**: Replace banner images, update seasonal headlines, and configure CTA button destinations.
- **Announcement Bar**: Rotate messages (e.g. *Complimentary shipping on orders over ₹2,999*).
- **Featured Drops**: Choose which capsules or products appear on the homepage showcase.

---

## 6. Marketing, Inquiries & Consultations (`/admin/marketing`)

- **Private Styling Consultations**: View incoming appointments requested by VIP patrons. View requested date, time slot, and wardrobe notes. Click to confirm and issue calendar invite.
- **Concierge Inquiries**: Inbox containing inquiries submitted from `/contact`. Mark messages as *In Progress* or *Resolved*.
- **Subscribers Register**: Export your newsletter subscriber list to CSV for your email marketing campaigns.

---

## 7. Need Technical Assistance?

For technical support or schema alterations, contact Lun AI support:
- Email: `support@lunai.agency`
- Emergency Concierge Hotline: `+91 (0) 22 4567 8900`

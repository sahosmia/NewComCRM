import os
import sys
from playwright.sync_api import sync_playwright, expect

def verify_dashboard():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        try:
            # Login process
            page.goto("http://localhost:8000/login", timeout=60000)
            page.fill('input[name="email"]', "admin@example.com")
            page.fill('input[name="password"]', "password")
            page.click('button[type="submit"]')

            # Wait for dashboard to load
            page.wait_for_url("**/dashboard", timeout=60000)
            page.wait_for_selector('text=Dashboard Overview', timeout=60000)

            # Take screenshot of the dashboard with birthday cards
            page.screenshot(path="verification/dashboard.png", full_page=True)

            # Navigate to Meetings to verify filters
            page.goto("http://localhost:8000/meetings")
            page.wait_for_selector('table', timeout=60000)
            page.screenshot(path="verification/meetings_index.png", full_page=True)

            # Navigate to Customer Create to verify DOB field
            page.goto("http://localhost:8000/customers/create")
            page.wait_for_selector('form', timeout=60000)
            page.screenshot(path="verification/customer_create.png", full_page=True)
        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png", full_page=True)
            with open("verification/error_content.txt", "w") as f:
                f.write(page.content())

        browser.close()

if __name__ == "__main__":
    verify_dashboard()

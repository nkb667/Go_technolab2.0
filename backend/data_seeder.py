# Database seeder for initial data
from database import DatabaseService
from models import *
from auth import AuthService
import asyncio

async def seed_initial_data(db_service: DatabaseService, auth_service: AuthService):
    """Initialize database with clean state - no pre-seeded data"""
    
    # Check if any admin user exists
    admin_count = await db_service.db.users.count_documents({"role": "admin"})
    
    print("Database initialized with clean state.")
    print("Create your first admin user through registration or use the setup endpoint.")
    
    # Only log the initialization, don't create any default data
    if admin_count == 0:
        print("No admin users found - system is ready for first admin registration.")
    else:
        print(f"Found {admin_count} admin user(s) in the system.")